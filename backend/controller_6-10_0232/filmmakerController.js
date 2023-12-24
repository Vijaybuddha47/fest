const Joi = require("joi");
const Flimmaker = require("../model/filmmaker");
const filmmaker = require("../model/filmmaker");
const aws = require('aws-sdk');

const FilmmakerDTO = require('../dto/filmmaker');

filmmakerController={
        async addFilmmaker(req, res, next)
        {
            //console.log(req.file)
            // return "ok";
            const filmmakerSchema = Joi.object({
                name: Joi.string().min(5).max(100).required(),
                social_link: Joi.string().allow(''),
                description: Joi.string().allow(''),
                status: Joi.string().allow(''),
                file:Joi.string().allow('')
            });
            // 
        const { error } = filmmakerSchema.validate(req.body);

        if(error)
        {
            return next(error);
        }

        const {name, social_link,description,status } = req.body;
        //console.log(req.file)
        let filename
        if(req.file!==undefined)
        {
            filename = Date.now() + '-' + req.file.originalname
            const s3 = new aws.S3({
                credentials: {
                accessKeyId: 'AKIAR6ITYLIGB5BKCG2A',
                secretAccessKey: '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',
                },
                region: 'us-east-1',
                useAccelerateEndpoint: true,
            
            });

            const params = {
                Bucket: 'bdm-flimfest-dev',
                Key: `${filename}`, // Object key in S3
                Body: req.file.buffer, // File buffer to be uploaded
              };
            
              // Upload the file to S3
              s3.upload(params, (err, data) => {
                if (err) {
                  console.error('S3 upload error:', err);
                  return res.status(500).json({ error: 'Error uploading file to S3' });
                }});
            // const {key} = req.file;
            // filename = key;
        }
        else
        {
            filename = undefined;
        }
        //console.log(filename);
       
        try
        {
           const filmmakerExit = await Flimmaker.exists({name});
            
            if(filmmakerExit)
            {
                const error = {
                    status: 409,
                    message: "filmmaker Already Exit",
                }

                return next(error);
            }
        }
        catch(error)
        {
            return next(error);
        }

        let filmmaker;

        try{
                if(filename!==undefined)
                {
                    filmmaker= new Flimmaker({
                        name,
                        social_link,
                        description,
                        image:filename,
                        status
                    })
                }
                else
                {
                    filmmaker = new Flimmaker({
                        name,
                        social_link,
                        description,
                        status
                    })
                }
            

            filmmakerUser = await filmmaker.save()
        }
        catch(error)
        {
            return next(error);
        }

       let message = "Filmmaker Added Successfully";
        return res.status(201).json({filmmakerUser,message});
        
    },
    async getAllfilmmaker(req, res, next)
    {

        try{
            const filmmakerData = await Flimmaker.find({});
          
            //FilmmakerDTO
            //const filmmakerdto = new FilmmakerDTO(filmmakers);
            const filmmaker = [];

            for (let i = 0; i < filmmakerData.length; i++) {
              const dto = new FilmmakerDTO(filmmakerData[i]);
              filmmaker.push(dto);
            } 

            if(filmmaker)
            {
                return res.status(200).json({filmmaker});
            }
            else
            {
                return res.status(404).json({filmmaker})
            }
            

        }
        catch(error)
        {
            return next(error);
        }
    },

    async removeFilmmaker(req, res, next)
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
            const FilmmakerData = await Flimmaker.findById({_id: id});
            //console.log(FilmmakerData);
            if(FilmmakerData.image!==undefined)
            {
                const s3 = new aws.S3({
                    credentials: {
                      accessKeyId: 'AKIAR6ITYLIGB5BKCG2A',
                      secretAccessKey: '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',
                    },
                    region: 'us-east-1',
                
                  });
                
                  const params = {
                    Bucket: 'bdm-flimfest-dev',
                    Key: FilmmakerData.image,
                  };
                
                  s3.deleteObject(params, (err, data) => {
                    if (err) {
                      console.error('Error deleting file from S3:', err);
                    } else {
                      console.log('File deleted successfully');
                    }
                  });
            }

            const deleteData = await filmmaker.deleteOne({_id:id});

            const{deletedCount} = deleteData;

            if(!deletedCount)
            {
                return res.status(404).json({message: "Filmmaker Not Exist"});
            }
        }
        catch(error)
        {
            return next(error);
        }

        return res.status(200).json({message: "Deleted Successfully"});

    },

    async updateFilmmaker(req, res, next)
    {
        
        const updateSchema = Joi.object({
           
            id: Joi.string().required(),
            name:Joi.string().required(),
            social_link:Joi.string().allow(''),
            description:Joi.string().allow(''),
            status:Joi.string(),
            file:Joi.string().allow('')

        });
        
        const { error } = updateSchema.validate(req.body);
        //console.log(req.body.name)

        if(error)
        {
            return next(error);
        }
        
        const {name, social_link, status, id, description} = req.body;
        

        let filename
        if(req.file!==undefined)
        {
            
            filename = Date.now() + '-' + req.file.originalname
            const s3 = new aws.S3({
                credentials: {
                accessKeyId: 'AKIAR6ITYLIGB5BKCG2A',
                secretAccessKey: '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',
                },
                region: 'us-east-1',
                useAccelerateEndpoint: true,
            
            });

            const params = {
                Bucket: 'bdm-flimfest-dev',
                Key: `${filename}`, // Object key in S3
                Body: req.file.buffer, // File buffer to be uploaded
              };
            
              // Upload the file to S3
              s3.upload(params, (err, data) => {
                if (err) {
                  console.error('S3 upload error:', err);
                  return res.status(500).json({ error: 'Error uploading file to S3' });
                }});
        }
        else
        {
            filename = undefined;
        }

        //console.log(filename);
        try{
            
            const FilmmakerData = await Flimmaker.findById({_id: id});
            if(filename===undefined)
            {
                const updateStatus = await Flimmaker.updateOne({_id: id},
                    {
                        name,
                        social_link,
                        status,
                        description,
                    });
            }
            if(filename!==undefined)
            {
                if(FilmmakerData.image!==undefined)
                {
                    const s3 = new aws.S3({
                        credentials: {
                        accessKeyId: 'AKIAR6ITYLIGB5BKCG2A',
                        secretAccessKey: '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',
                        },
                        region: 'us-east-1',
                    
                    });
                    
                    const params = {
                        Bucket: 'bdm-flimfest-dev',
                        Key: FilmmakerData.image,
                    };
                    
                    s3.deleteObject(params, (err, data) => {
                        if (err) {
                        console.error('Error deleting file from S3:', err);
                        } else {
                        console.log('File deleted successfully');
                        }
                    });
                }

                const updateStatus = await Flimmaker.updateOne({_id: id},
                    {
                        name,
                        social_link,
                        status,
                        image:filename
                    });
            }
        }
        catch(error)
        {
            return next(error);
        }

        return res.status(200).json({message: "Filmmaker Updated Successfully"});
    },

    async getFilmmakerById(req, res, next)
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
            const filmmakerData = await Flimmaker.findById({_id: id});
            
            const filmmaker = new FilmmakerDTO(filmmakerData);
           //console.log(filmmakerData)
            // for (let i = 0; i < filmmakerData.length; i++) {
            //   const dto = new FilmmakerDTO(filmmakerData[i]);
            //   filmmaker.push(dto);
            // } 
            // ;
            if(!filmmaker)
            {
                return res.status(404).json({message: "Filmmaker Not Exist"});
            }
            else
            {
                return res.status(200).json({filmmaker});
            }
        }
        catch(error)
        {
            return next(error);
        }

    }
}

module.exports = filmmakerController;