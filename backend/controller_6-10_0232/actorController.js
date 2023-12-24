const Joi = require("joi");
const Actor = require('../model/actor');
const ActorDTO = require('../dto/actor');

actorController= {

    async AddActor(req,res,next)
    {
        const actorSchema = Joi.object({
            actor_name: Joi.string().min(5).max(100).required(),
            social_link: Joi.string(),
            status: Joi.string(),
        });

        //Destructure error fron Joi object;
        const {error} = actorSchema.validate(req.body);

        if(error)
        {
            return next(error);
        }

        //if actor already 
        const {actor_name,social_link} = req.body;

        try
        {
            const actorExist = await Actor.exists({actor_name});

            if(actorExist)
            {
                const error = {
                    status: 409,
                    message: 'Actor Already exist',
                }
                return next(error);
            }
        }
        catch(error)
        {
            return next(error);
        }

        let actorUser;

        try{
            const AddActor = new Actor({
                actor_name,
                social_link,
            })

            actorUser = await AddActor.save();
        }
        catch(error)
        {
            return next(error);
        }
        let msg ="Actor added Successfully";
        const actorDTO = new ActorDTO(actorUser);
        //console.log(actorUser);
        return res.status(201).json({ actorDTO, msg});
    },

    async getAllactor(req,res,next)
    {

        try{
            const actors = await Actor.find({});
            // res.send(actors);
            // console.log(actors);
            if(actors)
            {
                return res.status(200).json({actors});
            }
            else
            {
                return res.status(404).json({actors})
            }
            

        }
        catch(error)
        {
            return next(error);
        }
    },

    //Remove actor
    async removeActor(req, res, next)
    {
        const deleteSchema = Joi.object({
            id: Joi.string().required()
        });
        
        const {error} = deleteSchema.validate(req.params);
        const {id} = req.params;

        //res.send(req.params);

        try{
           const deleteData = await Actor.deleteOne({_id: id});
           const {deletedCount} = deleteData;
        //    console.log(deletedCount);
        //     res.send(deletedCount)
           if(!deletedCount)
           {
                return res.status(404).json({message:"Actor Not Exist"})
           }
        }
        catch(error)
        {
            return next(error);
        }

        return res.status(200).json({message: "Deleted Successfully"});
    },
    async updateActor(req, res, next)
    {
        //res.send("dasdsdasdsd");
        const updateSchema = Joi.object({
            actor_name: Joi.string().min(5).max(100).required(),
            social_link: Joi.string(),
            status: Joi.string(),
            id: Joi.string().required()
        });

        const {error} = updateSchema.validate(req.body);

        if(error)
        {
            return next(error);
        }

        const{actor_name, social_link, id, status} = req.body;

        try{
           const updateStatus=  await Actor.updateOne({
                _id:id
            },
            {
                actor_name,
                social_link,
                status,
            }
            );
            
            // if(!updateStatus)
            // {
            //     res.send('dadsad');
            // }
            return res.status(200).json({ message: "Actor updated Successfully!" });
        }
        catch(error)
        {
            return next (error);
        }
    },
    async getActorById(req, res, next)
    {
        const getSchema = Joi.object({
            id: Joi.string().required(),
        });

        const {error} = getSchema.validate(req.params);

        if(error)
        {
            return next(error);
        }

        const {id} = req.params;

        try{
            const ActorData = await Actor.findById({_id: id});

            if(!ActorData)
            {
                return res.status(404).json({message: "Actor Not Exist"});
            }
            else
            {
                return res.status(200).json({ActorData});
            }
        }
        catch(error)
        {
            return next(error);
        }

        

    },

}

module.exports = actorController;