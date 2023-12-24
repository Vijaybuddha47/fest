const Joi = require("joi");
const Genre = require("../model/genre");
//const DirectorDTO = require("../dto/director");


genreController= {
    async addGenre(req, res, next)
    {
        const genreSchema = Joi.object({
            genre: Joi.string().required(),
            status: Joi.string(),
        });

        const { error } = genreSchema.validate(req.body);

        if(error)
        {
            return next(error);
        }

        const {genre} = req.body;

        try
        {
           const genreExit = await Genre.exists({genre});
            
            if(genreExit)
            {
                const error = {
                    status: 409,
                    message: "Genre Already Exit",
                }

                return next(error);
            }
        }
        catch(error)
        {
            return next(error);
        }

        let genres;

        try{
            const addGenre = new Genre({
                genre,
            })

            genres = await addGenre.save()
        }
        catch(error)
        {
            return next(error);
        }

       let message = "Genre Added Successfully";
        return res.status(201).json({genres,message});

    },

    async getAllgenre(req, res, next)
    {

        try{
            const genresList = await Genre.find({});
          
            if(genresList)
            {
                return res.status(200).json({genresList});
            }
            else
            {
                return res.status(404).json({genresList})
            }
            

        }
        catch(error)
        {
            return next(error);
        }
    },

    async removeGenre(req, res, next)
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
            const deleteData = await Genre.deleteOne({_id:id});

            const{deletedCount} = deleteData;

            if(!deletedCount)
            {
                return res.status(404).json({message: "Genre Not Exist"});
            }
        }
        catch(error)
        {
            return next(error);
        }

        return res.status(200).json({message: "Deleted Successfully"});

    },

    async updateGenre(req, res, next)
    {
        const updateSchema = Joi.object({
            genre: Joi.string().required(),
            status: Joi.string(),
            id: Joi.string().required(),
        });

        const { error } = updateSchema.validate(req.body);

        if(error)
        {
            return next(error);
        }

        const {genre, status, id} = req.body;

        try{

            const validateId = await Genre.findById({_id: id});

            if(!validateId)
            {
                return res.status(400).json({message: "Invalid Id"});
            }
            
            const updateStatus = await Genre.updateOne({_id: id},
                {
                    genre,
                    status,
                });
        }
        catch(error)
        {
            return next(error);
        }

        return res.status(200).json({message: "Genre Updated Successfully"});
    },

    async getAllGenreById(req, res, next)
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
            const genreData = await Genre.findById({_id: id});

            if(!genreData)
            {
                return res.status(404).json({message: "Genre Not Exist"});
            }
            else
            {
                return res.status(200).json({genreData});
            }
        }
        catch(error)
        {
            return next(error);
        }

        

    },
    async getgenreData(req, res, next)
    {
        try{
            const genresList = await Genre.find({status:'A'},'_id genre');
          
            if(genresList)
            {
                return res.status(200).json({genresList});
            }
            else
            {
                return res.status(404).json({genresList})
            }
            

        }
        catch(error)
        {
            return next(error);
        }
    }

}


module.exports = genreController;