const Joi = require("joi");
const Producer = require("../model/producer");
//const DirectorDTO = require("../dto/director");


producerController= {
    async addProducer(req, res, next)
    {
        const producerSchema = Joi.object({
            producer_name: Joi.string().min(5).max(100).required(),
            social_link: Joi.string(),
            status: Joi.string(),
        });

        const { error } = producerSchema.validate(req.body);

        if(error)
        {
            return next(error);
        }

        const {producer_name, social_link} = req.body;
        
        //res.send(producer_name);
        //console.log(Producer.find());

        try
        {
           const producerExit = await Producer.exists({producer_name});
            
            if(producerExit)
            {
                const error = {
                    status: 409,
                    message: "Producer Already Exit",
                }

                return next(error);
            }
        }
        catch(error)
        {
            return next(error);
        }

        let producerUser;

        try{
            const addProducer = new Producer({
                producer_name,
                social_link,
            })

            producerUser = await addProducer.save()
        }
        catch(error)
        {
            return next(error);
        }

       let message = "Producer Added Successfully";
        return res.status(201).json({producerUser,message});

    },

    async getAllproducer(req, res, next)
    {

        try{
            const producers = await Producer.find({});
          
            if(producers)
            {
                return res.status(200).json({producers});
            }
            else
            {
                return res.status(404).json({producers})
            }
            

        }
        catch(error)
        {
            return next(error);
        }
    },

    async removeProducer(req, res, next)
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
            const deleteData = await Producer.deleteOne({_id:id});

            const{deletedCount} = deleteData;

            if(!deletedCount)
            {
                return res.status(404).json({message: "Producer Not Exist"});
            }
        }
        catch(error)
        {
            return next(error);
        }

        return res.status(200).json({message: "Deleted Successfully"});

    },

    async updateProducer(req, res, next)
    {
        const updateSchema = Joi.object({
            producer_name: Joi.string().required(),
            social_link: Joi.string(),
            status: Joi.string(),
            id: Joi.string().required(),
        });

        const { error } = updateSchema.validate(req.body);

        if(error)
        {
            return next(error);
        }

        const {producer_name, social_link, status, id} = req.body;

        try{
            const updateStatus = await Producer.updateOne({_id: id},
                {
                    producer_name,
                    social_link,
                    status,
                });
        }
        catch(error)
        {
            return next(error);
        }

        return res.status(200).json({message: "Producer Updated Successfully"});
    },
    async getProducerById(req, res, next)
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
            const ProducerData = await Producer.findById({_id: id});

            if(!ProducerData)
            {
                return res.status(404).json({message: "Director Not Exist"});
            }
            else
            {
                return res.status(200).json({ProducerData});
            }
        }
        catch(error)
        {
            return next(error);
        }

        

    }

}

module.exports = producerController;