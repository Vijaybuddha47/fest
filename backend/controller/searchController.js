const Festival = require("../model/festival");
const Favorite = require("../model/favorite");
const Film = require("../model/film");
const Joi = require("joi");
const DataDTO = require('../dto/data');

const Actor = require('../model/actor');
const Category = require("../model/category");
const Director = require("../model/director");
const Filmmaker = require("../model/filmmaker");
const Genre = require("../model/genre");
const Producer = require("../model/producer");

const dashboardController = require("./dashboardController");
const detailController = require("./detailController");


searchController = {

    async getSearchData(req, res, next) {
        const searchSchema = Joi.object({
            title: Joi.string().required(),
        });

        // const { error } = searchSchema.validate(req.body);
        // //console.log(req.body.name)

        // if(error)
        // {
        //     return next(error);
        // }

        const { title } = req.body;

        try {
            const filmData = await searchController.filmData(title)

            //const festData = await searchController.festData(title)
            // console.log(festData)
            const search_result = filmData;
            if (search_result.length > 0) {
                return res.status(200).json({ search_result });
            }
            else {
                return res.status(404).json({ search_result });
            }

        }
        catch (error) {
            return next(error);
        }
    },
    async filmData(title) {
        let param = { status: 'A' };
        if (title) param = { ...param, title: { $regex: title, $options: 'i' } }

        console.log(param);

        const movieData = await Film.find(param)
            .populate('actor', 'actor_name social_link')
            .populate('director', 'director_name social_link')
            .populate('producer', 'producer_name social_link')
            .populate('filmmaker', 'name social_link image')
            .populate('genre', 'genre')
            .limit(30);

        const movies = [];

        for (let i = 0; i < movieData.length; i++) {
            const dto = new DataDTO(movieData[i]);

            movies.push(dto);
            // movies[i]['type']= 'M';
        }

        return movies;
    },
    async festData(title) {
        const movieData = await Festival.find({ title: { $regex: title, $options: 'i' } }).populate('actor', 'actor_name social_link')
            .populate('director', 'director_name social_link')
            .populate('producer', 'producer_name social_link')
            .populate('filmmaker', 'name social_link image')
            .populate('genre', 'genre');

        const movies = [];

        for (let i = 0; i < movieData.length; i++) {
            const dto = new DataDTO(movieData[i]);
            movies.push(dto);
            movies[i]['type'] = 'F';
        }

        return movies;
    },
    async getSearchData(req, res, next) {
        const { user_id } = req.params;
        console.log(req.params);

        const searchSchema = Joi.object({
            title: Joi.string().allow(''),
        });

        const { error } = searchSchema.validate(req.body);
        console.log(req.body)

        if (error) {
            return next(error);
        }

        const { title } = req.body;

        try {
            const filmData = await searchController.filterFilmData(title, user_id)

            //const festData = await searchController.festData(title)
            // console.log(festData)
            const search_result = filmData;
            if (search_result.length > 0) {
                return res.status(200).json({ search_result });
            }
            else {
                return res.status(404).json({ search_result });
            }

        }
        catch (error) {
            return next(error);
        }
    },
    async filterFilmData(title, user_id = '') {
        let param = { status: 'A' };
        let orParam = {};

        if (title) {

            param = { ...param, title: { $regex: title, $options: 'i' } }

            console.log(param);
            console.log(title);


            const actorList = await Actor.find({ actor_name: { $regex: title, $options: 'i' }, status: 'A' });
            let actorIds = []
            if (actorList) {
                console.log("actorList", actorList);
                actorList.map((a) => {
                    actorIds.push(a._id);
                });

                console.log("actorids", actorIds);

                if (actorList.length > 0) orParam = { ...orParam, actor: { $in: actorIds, $options: 'i' } }

            }

            const categoryList = await Category.find({ cat_name: { $regex: title, $options: 'i' }, status: 'A' });
            let categoryIds = []
            if (categoryList) {
                console.log("categoryList", categoryList);
                categoryList.map((a) => {
                    categoryIds.push(a._id);
                });
                if (categoryIds.length > 0) orParam = { ...orParam, category: { $in: categoryIds, $options: 'i' } }
            }

            const directorList = await Director.find({ director_name: { $regex: title, $options: 'i' }, status: 'A' });
            let directorIds = []
            if (directorList) {
                console.log("directorList", directorList);
                directorList.map((a) => {
                    directorIds.push(a._id);
                });

                if (directorIds.length > 0) orParam = { ...orParam, director: { $in: directorIds, $options: 'i' } }
            }

            const filmMakerList = await Filmmaker.find({ name: { $regex: title, $options: 'i' }, status: 'A' });
            let makerIds = []
            if (filmMakerList) {
                console.log("filmMakerList", filmMakerList);
                filmMakerList.map((a) => {
                    makerIds.push(a._id);
                });

                if (makerIds.length > 0) orParam = { ...orParam, filmmaker: { $in: makerIds, $options: 'i' } }
            }

            const genresList = await Genre.find({ genre: { $regex: title, $options: 'i' }, status: 'A' });
            let genreIds = []
            if (genresList) {
                console.log("genresList", genresList);
                genresList.map((a) => {
                    genreIds.push(a._id);
                });

                if (genreIds.length > 0) orParam = { ...orParam, genre: { $in: genreIds, $options: 'i' } }
            }

            const producerList = await Producer.find({ producer_name: { $regex: title, $options: 'i' }, status: 'A' });
            let producerIds = []
            if (producerList) {
                console.log("producerList", producerList);
                producerList.map((a) => {
                    producerIds.push(a._id);
                });

                if (producerIds.length > 0) orParam = { ...orParam, producer: { $in: producerIds, $options: 'i' } }
            }

        }


        console.log("Final  1111 param ", param);

        console.log("Final orParam ", orParam);

        if (JSON.stringify(orParam) !== "{}") {
            console.log(" orParam length");
            param = { ...param, $or: orParam };
        }

        console.log("Final 222 orParam ", param);

        const movieData = await Film.find(param, '_id title thumbnail banner trailer stream_file duration actor director filmmaker producer short_description long_description type status rating')
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
            })
            .limit(30);

        const movies = [];

        for (let i = 0; i < movieData.length; i++) {
            const dto = new DataDTO(movieData[i]);
            movies.push(dto);
            movies[i]['is_fav'] = user_id ? await dashboardController.checkFav(user_id, movies[i]['_id']) : false;
            movies[i]['is_vote'] = user_id ? await detailController.checkVote(user_id, movies[i]['_id']) : false;
        }

        console.log(movies);

        return movies;
    },

}

module.exports = searchController;