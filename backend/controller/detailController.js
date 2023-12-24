const Joi = require("joi");
const Film = require("../model/film");
const Festival = require("../model/festival");
const Vote = require('../model/vote');
const Favorite = require('../model/favorite');
const DataDTO = require('../dto/data');


detailController = {
    async movieDetail(req, res, next) {
        const detailSchema = Joi.object({
            movie_id: Joi.string().required().messages({
                'string.empty': `Movie id is not allowed to be empty.`,
                'any.required': `movie_id is required field.`,
            }),
            user_id: Joi.string().required().messages({
                'string.empty': `User id is not allowed to be empty.`,
                'any.required': `user_id is required field.`,
            }),
        });

        const { error } = detailSchema.validate(req.body);
        if (error) return res.status(400).json({ detail: [], related: [], message: error.message });

        const { movie_id, user_id } = req.body;
        // console.log(req.body);

        try {
            const movieData = await Film.find({ _id: movie_id }, '_id title thumbnail banner trailer stream_file duration actor director filmmaker producer short_description long_description type')
                .populate('actor', 'actor_name social_link')
                .populate('director', 'director_name social_link')
                .populate('producer', 'producer_name social_link')
                .populate('genre', 'genre')
                .populate('category', 'cate_name')
                .populate({
                    path: 'filmmaker', transform: function (data) {
                        for (const prop in data) {
                            if (prop == 'image') data[prop] = (data[prop] != '' ? 'https://da278ww3jdi3v.cloudfront.net/' + data[prop] : "");
                        }
                        return data;
                    }
                });

            const detail = [];
            for (let i = 0; i < movieData.length; i++) {
                const dto = new DataDTO(movieData[i]);
                let favDta = await detailController.checkFav(user_id, movieData[i]['_id']);
                detail.push(dto);
                detail[i]['is_fav'] = favDta;
            }


            let title = movieData[0]['title'];
            let type = movieData[0]['type'];
            const related = [];
            let param = { type: type, status: 'A' };
            // console.log(title, type);

            // if (title) param = { ...param, title: { $regex: title, $options: 'i' } }
            // console.log(param);

            const data = await Film.find(param)
                .populate('actor', 'actor_name social_link')
                .populate('director', 'director_name social_link')
                .populate('producer', 'producer_name social_link')
                .populate('filmmaker', 'name social_link image')
                .populate('genre', 'genre')
                .limit(10);

            // console.log(data);

            for (let i = 0; i < data.length; i++) {
                if (data[i]['title'] == title) continue;
                const dto = new DataDTO(data[i]);
                related.push(dto);
            }

            // console.log(related);

            return res.status(200).json({ detail, related, message: "success" });

            // return res.status(200).json({ detail });
        }
        catch (error) {
            return (next);
        }

    },

    async checkFav(user_id, movie_id) {
        const data = await Favorite.find({ user: user_id, film: movie_id });
        if (data.length > 0) return true;
        else return false;
    },

    async festivalDetails(req, res, next) {
        const detailSchema = Joi.object({
            fest_id: Joi.string().required().messages({
                'string.empty': `Festival id is not allowed to be empty.`,
                'any.required': `fest_id is required field.`,
            }),
            user_id: Joi.string().required().messages({
                'string.empty': `User id is not allowed to be empty.`,
                'any.required': `user_id is required field.`,
            }),
        });

        const { error } = detailSchema.validate(req.body);
        if (error) return res.status(400).json({ detail: [], related: [], message: error.message });

        const { fest_id, user_id } = req.body;

        try {
            const movieData = await Festival.find({ _id: fest_id }, '_id title thumbnail banner trailer stream_file duration actor director filmmaker producer short_description long_description type')
                .populate('actor', 'actor_name social_link')
                .populate('director', 'director_name social_link')
                .populate('producer', 'producer_name social_link')
                .populate('genre', 'genre').populate({
                    path: 'filmmaker', transform: function (data) {
                        for (const prop in data) {
                            if (prop == 'image') data[prop] = (data[prop] != '' ? 'https://da278ww3jdi3v.cloudfront.net/' + data[prop] : "");
                        }
                        return data;
                    }
                });


            const detail = [];
            for (let i = 0; i < movieData.length; i++) {
                const dto = new DataDTO(movieData[i]);
                let favDta = await detailController.checkVote(user_id, movieData[i]['_id']);
                detail.push(dto);
                detail[i]['is_vote'] = favDta;
            }

            let title = movieData[0]['title'];
            let type = movieData[0]['type'];
            const related = [];
            let param = { type: type, status: 'A' };
            // console.log(title, type);

            // if (title) param = { ...param, title: { $regex: title, $options: 'i' } }

            // console.log(param);

            const data = await Festival.find(param)
                .populate('actor', 'actor_name social_link')
                .populate('director', 'director_name social_link')
                .populate('producer', 'producer_name social_link')
                .populate('filmmaker', 'name social_link image')
                .populate('genre', 'genre')
                .limit(10);

            // console.log(data);

            for (let i = 0; i < data.length; i++) {
                if (data[i]['title'] == title) continue;
                const dto = new DataDTO(data[i]);
                related.push(dto);
            }

            // console.log(related);

            return res.status(200).json({ detail, related, message: "success" });

            // return res.status(200).json({ detail });
        }
        catch (error) {
            return (next);
        }
    },

    async checkVote(user_id, fest_id) {
        const data = await Vote.find({ user: user_id, festival: fest_id });
        if (data.length > 0) {
            return true;
        }
        else {
            return false;
        }
    },

    async movieDetailInformation(req, res, next) {
        const detailSchema = Joi.object({
            movie_id: Joi.string().required().messages({
                'string.empty': `Movie id is not allowed to be empty.`,
                'any.required': `movie_id is required field.`,
            })
        });

        const { error } = detailSchema.validate(req.body);
        if (error) return res.status(400).json({ detail: [], related: [], message: error.message });

        const { movie_id } = req.body;

        try {
            const movieData = await Film.find({ _id: movie_id }, '_id title thumbnail banner trailer stream_file duration actor director filmmaker producer short_description long_description type')
                .populate('actor', 'actor_name social_link')
                .populate('director', 'director_name social_link')
                .populate('producer', 'producer_name social_link')
                .populate('genre', 'genre')
                .populate({
                    path: 'filmmaker', transform: function (data) {
                        for (const prop in data) {
                            if (prop == 'image') data[prop] = (data[prop] != '' ? 'https://da278ww3jdi3v.cloudfront.net/' + data[prop] : "");
                        }
                        return data;
                    }
                });
            // console.log(movieData);

            const detail = [];
            for (let i = 0; i < movieData.length; i++) {
                const dto = new DataDTO(movieData[i]);
                detail.push(dto);
            }

            let title = movieData[0]['title'];
            let type = movieData[0]['type'];
            const related = [];
            let param = { type: type, status: 'A' };
            // console.log(title, type);

            // if (title) param = { ...param, title: { $regex: title, $options: 'i' } }
            // console.log(param);

            const data = await Film.find(param)
                .populate('actor', 'actor_name social_link')
                .populate('director', 'director_name social_link')
                .populate('producer', 'producer_name social_link')
                .populate('filmmaker', 'name social_link image')
                .populate('genre', 'genre')
                .limit(10);

            // console.log(data);

            for (let i = 0; i < data.length; i++) {
                if (data[i]['title'] == title) continue;
                const dto = new DataDTO(data[i]);
                related.push(dto);
            }

            // console.log(related);

            return res.status(200).json({ detail, related, message: "success" });
        }
        catch (error) {
            return (next);
        }

    },

    async festivalDetailInformation(req, res, next) {
        const detailSchema = Joi.object({
            fest_id: Joi.string().required().messages({
                'string.empty': `Festival id is not allowed to be empty.`,
                'any.required': `festival_id is required field.`,
            })
        });
        const { error } = detailSchema.validate(req.body);
        // console.log(error);
        if (error) return res.status(400).json({ detail: [], related: [], message: error.message });

        const { fest_id } = req.body;

        try {
            const festivalData = await Festival.find({ _id: fest_id }, '_id title thumbnail banner trailer stream_file duration actor director filmmaker producer short_description long_description type')
                .populate('actor', 'actor_name social_link')
                .populate('director', 'director_name social_link')
                .populate('producer', 'producer_name social_link')
                .populate('genre', 'genre')
                .populate({
                    path: 'filmmaker', transform: function (data) {
                        for (const prop in data) {
                            if (prop == 'image') data[prop] = (data[prop] != '' ? 'https://da278ww3jdi3v.cloudfront.net/' + data[prop] : "");
                        }
                        return data;
                    }
                });
            // console.log(festivalData);

            const detail = [];
            for (let i = 0; i < festivalData.length; i++) {
                const dto = new DataDTO(festivalData[i]);
                detail.push(dto);
            }

            let title = festivalData[0]['title'];
            let type = festivalData[0]['type'];
            const related = [];
            let param = { type: type, status: 'A' };
            // console.log(title, type);

            // if (title) param = { ...param, title: { $regex: title, $options: 'i' } }

            // console.log(param);

            const data = await Festival.find(param)
                .populate('actor', 'actor_name social_link')
                .populate('director', 'director_name social_link')
                .populate('producer', 'producer_name social_link')
                .populate('filmmaker', 'name social_link image')
                .populate('genre', 'genre')
                .limit(10);

            // console.log(data);

            for (let i = 0; i < data.length; i++) {
                if (data[i]['title'] == title) continue;
                const dto = new DataDTO(data[i]);
                related.push(dto);
            }

            // console.log(related);

            return res.status(200).json({ detail, related, message: "success" });
        }
        catch (error) {
            return (next);
        }

    },

    async itemDetail(req, res, next) {
        const detailSchema = Joi.object({
            item_id: Joi.string().required().messages({
                'string.empty': `item id is not allowed to be empty.`,
                'any.required': `item id is required field.`,
            }),
            user_id: Joi.string().allow('')
        });

        const { error } = detailSchema.validate(req.body);
        if (error) return res.status(400).json({ status: 1, message: error.message, detail: [], related: [] });

        const { item_id, user_id } = req.body;
        // console.log(req.body);
        let itemData, relatedData;

        try {
            itemData = await Film.find({ _id: item_id }, '_id title thumbnail banner trailer stream_file duration actor director filmmaker producer short_description long_description type')
                .populate('actor', 'actor_name social_link')
                .populate('director', 'director_name social_link')
                .populate('producer', 'producer_name social_link')
                .populate('genre', 'genre')
                .populate('category', '_id cat_name')
                .populate({
                    path: 'filmmaker', transform: function (data) {
                        for (const prop in data) {
                            if (prop == 'image') data[prop] = (data[prop] != '' ? 'https://da278ww3jdi3v.cloudfront.net/' + data[prop] : "");
                        }
                        return data;
                    }
                });

            const detail = [];
            for (let i = 0; i < itemData.length; i++) {
                const dto = new DataDTO(itemData[i]);
                let favDta = user_id ? await detailController.checkFav(user_id, itemData[i]['_id']) : false;
                detail.push(dto);
                detail[i]['is_fav'] = favDta;

                if (itemData[i]['category'].cat_name === 'Festival') {
                    detail[i]['type'] = 'F';
                    detail[i]['is_vote'] = user_id ? await detailController.checkVote(user_id, detail[i]['_id']) : false;
                }
                else detail[i]['type'] = 'M';
            }

            if (detail.length < 1) return res.status(200).json({ status: 1, message: "data retrieved successfully", detail: [], related: [] });

            let title = itemData[0]['title'];

            let catType = itemData[0]['category'].cat_name;
            let catId = itemData[0]['category']._id;

            const related = [];
            let param = { category: catId, status: 'A' };

            relatedData = await Film.find(param, '_id title thumbnail banner trailer stream_file duration actor director filmmaker producer short_description long_description type')
                .populate('actor', 'actor_name social_link')
                .populate('director', 'director_name social_link')
                .populate('producer', 'producer_name social_link')
                .populate('genre', 'genre')
                .populate('category', '_id cat_name')
                .populate({
                    path: 'filmmaker', transform: function (data) {
                        for (const prop in data) {
                            if (prop == 'image') data[prop] = (data[prop] != '' ? 'https://da278ww3jdi3v.cloudfront.net/' + data[prop] : "");
                        }
                        return data;
                    }
                })
                .limit(10);


            for (let i = 0; i < relatedData.length; i++) {
                if (relatedData[i]['title'] == title) continue;

                if (relatedData[i]['category'].cat_name === 'Festival') relatedData[i]['type'] = 'F';
                else relatedData[i]['type'] = 'M';

                relatedData[i]['is_vote'] = user_id ? await detailController.checkVote(user_id, relatedData[i]['_id']) : false;
                relatedData[i]['is_fav'] = user_id ? await detailController.checkFav(user_id, relatedData[i]['_id']) : false;

                const dto = new DataDTO(relatedData[i]);
                related.push(dto);
            }

            return res.status(200).json({ status: 1, message: "data retrieved successfully", detail: detail[0], related });
        }
        catch (error) {
            return res.status(200).json({ status: 1, message: error.message, detail: [], related: [] });
        }

    },

}
module.exports = detailController;