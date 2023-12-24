const Joi = require("joi");
const App = require("../model/app");

appController = {

    async addAppsetting(req, res, next)
    {
        const genreSchema = Joi.object({
            name: Joi.string().required(),
            label: Joi.string().required(),
            mail: Joi.string().required(),
            status: Joi.string(),
        });

        const { error } = genreSchema.validate(req.body);

        if(error)
        {
            return next(error);
        }

        const {name, label, mail} = req.body;

        

        let appSetting;

        try{
            console.log(name, label, mail)
            const addGenre = new App({
                name,
                label,
                mail
            })

            appSetting = await addGenre.save()
        }
        catch(error)
        {
            return next(error);
        }

       let message = "App Setting Added Successfully";
        return res.status(201).json({appSetting,message});

    },
    async updateApp(req, res, next)
    {
       
        const updateSchema = Joi.object({
            name: Joi.string().required(),
            label: Joi.string().required(),
            mail: Joi.string().required(),
            id: Joi.string().required(),
            status: Joi.string(),
        });
        console.log(req.body)
        const { error } = updateSchema.validate(req.body);
       
        if(error)
        {
            return next(error);
        }
        
        const {name, label, mail,status, id} = req.body;
        console.log(name, label, mail);

        try{

            const validateId = await App.findById({_id: id});

            if(!validateId)
            {
                return res.status(400).json({message: "Invalid Id"});
            }
            
            const updateStatus = await App.updateOne({_id: id},
                {
                    name,
                    label,
                mail,
                status,
                });
        }
        catch(error)
        {
            return next(error);
        }

        return res.status(200).json({message: "App Setting Updated Successfully"});
    },

    async getAppsettingId(req, res, next)
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
            const appSetting = await App.findById({_id: id});

            if(!appSetting)
            {
                return res.status(404).json({message: "app Setting Not Exist"});
            }
            else
            {
                return res.status(200).json({appSetting});
            }
        }
        catch(error)
        {
            return next(error);
        }

        

    },
}

module.exports = appController;