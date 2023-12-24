const Joi = require("joi");
const Director = require("../model/director");
//const DirectorDTO = require("../dto/director");
const director = require("../model/director");

directorController= {
    async addDirector(req, res, next)
    {
        const directorSchema = Joi.object({
            director_name: Joi.string().min(5).max(100).required(),
            social_link: Joi.string(),
            status: Joi.string(),
        });

        const { error } = directorSchema.validate(req.body);

        if(error)
        {
            return next(error);
        }

        const {director_name, social_link} = req.body;

        try
        {
            const directorExit = await Director.exists({director_name});

            if(directorExit)
            {
                const error = {
                    status: 409,
                    message: "Director Already Exit",
                }

                return next(error);
            }
        }
        catch(error)
        {
            return next(error);
        }

        let directorUser;

        try{
            const addDirector = new Director({
                director_name,
                social_link,
            })

            directorUser = await addDirector.save()
        }
        catch(error)
        {
            return next(error);
        }

       let message = "Director Added Successfully";
        return res.status(201).json({directorUser,message});

    },

    async getAlldirector(req, res, next)
    {

        try{
            const directors = await Director.find({});
          
            if(directors)
            {
                return res.status(200).json({directors});
            }
            else
            {
                return res.status(404).json({directors})
            }
            

        }
        catch(error)
        {
            return next(error);
        }
    },

    async removeDirector(req, res, next)
    {
        const deleteSchema = Joi.object({
            id: Joi.string().required(),
        });

        const {error} = deleteSchema.validate(req.params);

        if(error)
        {
            return next(error);
        }

        const {id} = req.params;

        try{
            const deleteData = await Director.deleteOne({_id:id});

            const{deletedCount} = deleteData;

            if(!deletedCount)
            {
                return res.status(404).json({message: "Director Not Exist"});
            }
        }
        catch(error)
        {
            return next(error);
        }

        return res.status(200).json({message: "Deleted Successfully"});

    },

    async updateDirector(req, res, next)
    {
        const updateSchema = Joi.object({
            director_name: Joi.string().required(),
            social_link: Joi.string(),
            status: Joi.string(),
            id: Joi.string().required(),
        });

        const { error } = updateSchema.validate(req.body);

        if(error)
        {
            return next(error);
        }

        const {director_name, social_link, status, id} = req.body;

        try{
            
            const updateStatus = await Director.updateOne({_id: id},
                {
                    director_name,
                    social_link,
                    status,
                });
        }
        catch(error)
        {
            return next(error);
        }

        return res.status(200).json({message: "Director Updated Successfully"});
    },

    async getDirectorById(req, res, next)
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
            const DirectorData = await Director.findById({_id: id});

            if(!DirectorData)
            {
                return res.status(404).json({message: "Director Not Exist"});
            }
            else
            {
                return res.status(200).json({DirectorData});
            }
        }
        catch(error)
        {
            return next(error);
        }

        

    }

},


module.exports = directorController;