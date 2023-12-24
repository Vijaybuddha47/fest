const Joi = require("joi");
const Film = require("../model/film");
const User = require("../model/user");
const Favorite = require("../model/favorite");

favoriteController = {
async addFavorite(req, res, next){

    const favoriteSchema = Joi.object({
        movie_id: Joi.string().required(),
        user_id: Joi.string().required(),
    });
    const{ error } = favoriteSchema.validate(req.body);

    if(error)
    {
        return next(error);
    }

    const {user_id,movie_id} = req.body;
    // console.log(movie_id);
    // return
    let favorite;

    try{
            const userData = await User.findOne({_id:user_id});
            const movieData = await Film.exists({_id:movie_id});
           // console.log(userData);
            if(!userData)
            {
                return res.status(400).json({message: "Invalid User Id"});
            }

            if(!movieData)
            {
                return res.status(400).json({message: "Invalid Movie Id"});
            }

            const favListPresnt = await Favorite.find({film:movie_id,user:user_id});
            if(favListPresnt.length>0)
            {
                await Favorite.deleteOne({film:movie_id,user:user_id});
                let message = "Remove from Favorite list"
                return res.status(200).json({ message});
            }
           else
            {
                const addToFav = new Favorite({
                    film:movie_id,
                    user:user_id,
                })
                favorite = await addToFav.save();
                let message = "Added to Favorite"
                return res.status(200).json({ message});
            }
    }
    catch(error)
    {
        return next(error);
    }

}
}

module.exports = favoriteController;