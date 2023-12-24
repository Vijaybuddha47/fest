const Joi = require("joi");
const Film = require("../model/film");
const User = require("../model/user");
const Vote = require("../model/vote");

voteController = {
async addVote(req, res, next){

    const voteSchema = Joi.object({
        fest_id: Joi.string().required(),
        user_id: Joi.string().required(),
    });
    const{ error } = voteSchema.validate(req.body);

    if(error)
    {
        return next(error);
    }

    const {user_id,fest_id} = req.body;
    // console.log(movie_id);
    // return
    let favorite;

    try{
            const userData = await User.findOne({_id:user_id});
            const movieData = await Film.exists({_id:fest_id});
           // console.log(userData);
            if(!userData)
            {
                return res.status(400).json({message: "Invalid User Id"});
            }

            if(!movieData)
            {
                return res.status(400).json({message: "Invalid Festival Id"});
            }

            const favListPresnt = await Vote.find({festival:fest_id,user:user_id});
            
            if(favListPresnt.length>0)
            {
                await Vote.deleteOne({festival:fest_id,user:user_id});
                let message = "Remove from Vote list"
                return res.status(200).json({ message});
            }
           else
            {
                const addToFav = new Vote({
                    festival:fest_id,
                    user:user_id,
                })
                favorite = await addToFav.save();
                //console.log(favorite)
                let message = "Voted Successfully"
                return res.status(200).json({ message});
            }
    }
    catch(error)
    {
        return next(error);
    }

}
}

module.exports = voteController;