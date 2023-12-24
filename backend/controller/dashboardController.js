const Joi = require("joi");
const Film = require("../model/film");
const User = require("../model/user");
const Genre = require("../model/genre");
const Category = require("../model/category");
const Festival = require("../model/festival");
const DataDTO = require('../dto/data');
const SliderDTO = require('../dto/sliderdata');
const Favorite = require("../model/favorite");
const Vote = require("../model/vote");

const detailController = require("./detailController");


dashboardController = {
    async dashboardData(req, res, next) {

        const { user_id } = req.params;
        // console.log(user_id)
        try {
            let categories = [];
            const catData = await dashboardController.catData();
            //const stramArr = [];
            for (const cat of catData) {
                let catArr;
                let movieData;
                if (user_id === undefined) {
                    movieData = await dashboardController.filmData(cat._id);

                }
                else {
                    movieData = await dashboardController.filmDatawithUser(cat._id, user_id)
                }


                if (movieData.length > 0) {
                    catArr = {
                        'cat_id': cat._id,
                        'cat_name': cat.cat_name,
                        'streams': movieData
                    }
                    categories.push(catArr);
                }

            }

            return res.status(200).json({ categories });

        }
        catch (error) {
            return next(error);
        }
    },

    async catData() {
        const catData = await Category.find({ cat_name: { $ne: "Festival" }, status: 'A' }, '_id cat_name').sort({ order: 1 });
        return catData;
    },

    async filmData(genId) {
        const movieData = await Film.find({ category: genId, status: 'A' }, '_id title thumbnail banner trailer stream_file duration rating actor director filmmaker producer genre short_description long_description type').populate('actor', 'actor_name social_link')
            .populate('director', 'director_name social_link')
            .populate('producer', 'producer_name social_link')
            .populate('filmmaker', 'name social_link image')
            .populate('genre', 'genre')
            ;
        //console.log(movieData)
        const movies = [];

        for (let i = 0; i < movieData.length; i++) {
            const dto = new DataDTO(movieData[i]);
            movies.push(dto);
            movies[i]['is_fav'] = false;
            movies[i]['is_vote'] = false;
        }
        // console.log(movies)
        return movies;
    },
    async filmDatawithUser(genId, user_id) {
        const movieData = await Film.find({ category: genId, status: 'A' }, '_id title thumbnail banner trailer stream_file duration actor genre director filmmaker producer short_description long_description type').populate('actor', 'actor_name social_link')
            .populate('director', 'director_name social_link')
            .populate('producer', 'producer_name social_link')
            .populate('filmmaker', 'name social_link image')
            .populate('genre', 'genre')
            ;

        const movies = [];

        for (let i = 0; i < movieData.length; i++) {
            const dto = new DataDTO(movieData[i]);
            let favDta = await dashboardController.checkFav(user_id, movieData[i]['_id']);
            movies.push(dto);
            movies[i]['is_fav'] = favDta;
            movies[i]['is_vote'] = user_id ? await detailController.checkVote(user_id, movieData[i]['_id']) : false;
        }
        return movies;
    },
    async sliderData(req, res, next) {
        const { user_id } = req.params;
        try {
            const sliderArr = await Film.find({ is_slider: 'Y', status: 'A', type: 'M' }, '_id title thumbnail banner trailer stream_file duration rating actor director filmmaker producer genre short_description long_description type')
                .populate('actor', 'actor_name').sort({ order: 1 })
                .populate('director', 'director_name social_link')
                .populate('producer', 'producer_name social_link')
                .populate('filmmaker', 'name social_link')
                .populate('genre', 'genre');

            const slider = [];

            for (let i = 0; i < sliderArr.length; i++) {
                const dto = new SliderDTO(sliderArr[i]);
                slider.push(dto);
                slider[i]['is_fav'] = user_id ? await dashboardController.checkFav(user_id, sliderArr[i]['_id']) : false;
                slider[i]['is_vote'] = user_id ? await detailController.checkVote(user_id, sliderArr[i]['_id']) : false;

            }
            return res.status(200).json({ slider });
        }
        catch (error) {
            return error
        }
    },
    async dashboradData(req, res, next) {
        let dashboard;
        try {
            // const catData = await dashboardController.genData(); // Call genData function using direct object reference
            const totActiveUser = await User.countDocuments({ user_type: 'U', status: 'A' });
            const totUser = await User.countDocuments({ user_type: 'U' });
            const totInactiveUser = await User.countDocuments({ user_type: 'U', status: 'I' });
            const totmovie = await Film.countDocuments({});
            const totfestival = await Festival.countDocuments({});
            const totalVotes = await Vote.countDocuments({});
            dashboard = {
                'totActive_user': totActiveUser,
                'tot_user': totUser,
                'tot_inactive_user': totInactiveUser,
                'tot_movie': totmovie,
                'tot_fest': totfestival,
                'tot_votes': totalVotes,
                // 'catData': catData
            };

            //console.log(dashboard);
        }
        catch (error) {
            return (next)
        }
        return res.status(200).json({ dashboard });
    },
    async favData(req, res, next) {
        const { user_id } = req.params;

        const data = await Film.find({});
        //console.log(typeof(data))
        const movies = [];
        //console.log(data.length);
        for (let i = 0; i < data.length; i++) {
            const dto = new DataDTO(data[i]);
            movies.push(dto);
            let catData = await dashboardController.checkFav(user_id, data[i]['_id']);
            movies[i]['is_fav'] = catData;
            movies[i]['is_vote'] = user_id ? await detailController.checkVote(user_id, data[i]['_id']) : false;
            // let fav = {'is_fav':catData}
            //data[i]['is_fav'] = catData
            // let updatedObject = { ...data[i], ['is_fav']: catData };
            // console.log(updatedObject);
        }

        return res.status(200).json({ movies });
    },

    async checkFav(user_id, movie_id) {
        const data = await Favorite.find({ user: user_id, film: movie_id });
        if (data.length > 0) {
            return true;
        }
        else {
            return false;
        }
    },
    async getFilmByGen(req, res, next) {
        const { id } = req.params
        try {
            const movieData = await Film.find({ genre: id }, '_id title thumbnail banner trailer stream_file duration actor director filmmaker genre producer short_description long_description type').populate('actor', 'actor_name social_link')
                .populate('director', 'director_name social_link')
                .populate('producer', 'producer_name social_link')
                .populate('filmmaker', 'name social_link image')
                .populate('genre', 'genre')
                ;
            console.log(movieData)
            const movies = [];

            for (let i = 0; i < movieData.length; i++) {
                const dto = new DataDTO(movieData[i]);
                movies.push(dto);
                movies[i]['is_fav'] = false;
                movies[i]['is_vote'] = false;
            }
            // console.log(movies)
            return res.status(200).json({ movies });
        }
        catch (error) {
            return (next);
        }
    },
    async getFestivalSliderData(req, res, next) {
        const { user_id } = req.params;

        try {
            const sliderArr = await Film.find({ is_slider: 'Y', status: 'A', type: 'F' }, '_id title thumbnail banner trailer stream_file duration rating actor director filmmaker producer genre short_description long_description type')
                .populate('actor', 'actor_name').sort({ order: 1 })
                .populate('director', 'director_name social_link')
                .populate('producer', 'producer_name social_link')
                .populate('filmmaker', 'name social_link')
                .populate('genre', 'genre');

            const slider = [];

            for (let i = 0; i < sliderArr.length; i++) {
                const dto = new SliderDTO(sliderArr[i]);
                slider.push(dto);
                slider[i]['is_fav'] = false;
                slider[i]['is_vote'] = user_id ? await detailController.checkVote(user_id, sliderArr[i]['_id']) : false;
            }

            return res.status(200).json({ slider });
        }
        catch (error) {
            return error
        }
    },
    async getGenreFilm(req, res, next) {
        const getSchema = Joi.object({
            genre_id: Joi.string().required(),
            user_id: Joi.string().allow(''),
        });

        const { error } = getSchema.validate(req.body);
        if (error) return res.status(400).json({ status: 0, message: error.message, data: [] });
        // console.log(req.body);

        const { genre_id, user_id } = req.body;

        try {
            const movieData = await Film.find({ genre: genre_id }, '_id title thumbnail banner trailer stream_file duration actor director filmmaker genre producer short_description long_description type').populate('actor', 'actor_name social_link')
                .populate('director', 'director_name social_link')
                .populate('producer', 'producer_name social_link')
                .populate('filmmaker', 'name social_link image')
                .populate('genre', 'genre');

            // console.log(movieData)
            const movies = [];

            for (let i = 0; i < movieData.length; i++) {
                const dto = new DataDTO(movieData[i]);
                movies.push(dto);
                movies[i]['is_fav'] = user_id ? await dashboardController.checkFav(user_id, movies[i]['_id']) : false;
                movies[i]['is_vote'] = user_id ? await detailController.checkVote(user_id, movies[i]['_id']) : false;
            }

            // console.log(movies)
            return res.status(200).json({ status: 1, message: "Data retrieved successfully", data: movies });
        }
        catch (error) {
            return res.status(400).json({ status: 0, message: error.message, data: [] });
        }
    },

}

module.exports = dashboardController;