const Joi = require("joi");
const Film = require("../model/film");
const User = require("../model/user");
const Favorite = require("../model/favorite");
const DataDTO = require('../dto/data');
const ObjectId = require('mongoose').Types.ObjectId;

favoriteController = {
    async addFavorite(req, res, next) {

        const favoriteSchema = Joi.object({
            movie_id: Joi.string().required(),
            user_id: Joi.string().required(),
        });
        const { error } = favoriteSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const { user_id, movie_id } = req.body;
        // console.log(movie_id);
        // return
        let favorite;

        try {
            const userData = await User.findOne({ _id: user_id });
            const movieData = await Film.exists({ _id: movie_id });
            // console.log(userData);
            if (!userData) {
                return res.status(400).json({ message: "Invalid User Id" });
            }

            if (!movieData) {
                return res.status(400).json({ message: "Invalid Movie Id" });
            }

            const favListPresnt = await Favorite.find({ film: movie_id, user: user_id });
            if (favListPresnt.length > 0) {
                await Favorite.deleteOne({ film: movie_id, user: user_id });
                let message = "Remove from Favorite list"
                return res.status(200).json({ message });
            }
            else {
                const addToFav = new Favorite({
                    film: movie_id,
                    user: user_id,
                })
                favorite = await addToFav.save();
                let message = "Added to Favorite"
                return res.status(200).json({ message });
            }
        }
        catch (error) {
            return next(error);
        }

    },

    async favoriteData(req, res, next) {
        const result = [];
        try {

            if (!req.params) return res.status(400).json({ data: result, status: 0, message: "Please enter valid user id." });

            const { user_id } = req.params;
            console.log(user_id);

            if (!ObjectId.isValid(user_id) && ((String)(new ObjectId(user_id)) !== user_id))
                return res.status(400).json({ data: result, status: 0, message: "Please enter valid user id." });

            const userData = await User.findOne({ _id: user_id });
            if (!userData) return res.status(400).json({ data: result, status: 0, message: "Please enter valid user id." });

            const data = await Favorite.find({ user: user_id });
            if (data.length < 1) return res.status(200).json({ data: result, status: 1, message: "data retrieved successfully" });
            // console.log(data)

            const filmIds = data.map((item) => { return item.film });
            console.log(filmIds);

            const favData = await Film.find({ _id: { $in: filmIds } }, '_id title thumbnail banner trailer stream_file duration actor director filmmaker producer short_description long_description type')
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

            console.log(favData);


            //console.log(data.length);
            for (let i = 0; i < favData.length; i++) {
                const dto = new DataDTO(favData[i]);
                result.push(dto);
                result[i]['is_fav'] = true;
                result[i]['is_vote'] = false;
            }

            return res.status(200).json({ data: result, status: 1, message: "data retrieved successfully" });

        } catch (error) {
            return res.status(400).json({ data: result, status: 0, message: error.message });
        }
    },
}

module.exports = favoriteController;