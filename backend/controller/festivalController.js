const Joi = require("joi");
const Festival = require("../model/festival");
const Film = require("../model/film");
const aws = require('aws-sdk');
const Category = require("../model/category");

const s3 = new aws.S3({
    credentials: {
        accessKeyId: 'AKIAR6ITYLIGB5BKCG2A',
        secretAccessKey: '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',
    },
    region: 'us-east-1',
    useAccelerateEndpoint: true,

});
const festivalDTO = require('../dto/festival');
const DataDTO = require('../dto/data');
const Vote = require('../model/vote');
// const festival = require("../model/festival");
const type = 'F';
festivalController = {
    async addfestival(req, res, next) {
        //console.log(req.body);
        // const filmSchema = Joi.object({
        //     name: Joi.string().min(5).max(100).required(),
        //     social_link: Joi.string().allow(''),
        //     description: Joi.string().allow(''),
        //     status: Joi.string().allow(''),
        //     file:Joi.string().allow('')
        // });


        //     const { error } = filmSchema.validate(req.body);

        //     if(error)
        //     {
        //         return next(error);
        //     }

        const { title, duration, genre, actor, director, producer, filmmaker, rating, ads_url, short_description, long_description, status, trailer, stream_file } = req.body;
        const gendata = genre.split(',');
        const actData = actor.split(',');
        const dirData = director.split(',');
        const prodData = producer.split(',');
        const filmkrData = filmmaker.split(',');
        // const filmkrData;
        //let genreIds = genre.map(data => gen);
        //    console.log(genre.split(','));
        // console.log(req.files)
        let banner, thumbnail;
        if (req.files !== undefined || req.files != null) {
            // console.log(req.files[1].buffer);

            thumbnail = Date.now() + '-' + req.files.thumbnail[0].originalname;
            banner = Date.now() + '-' + req.files.banner[0].originalname;
            const params1 = {
                Bucket: 'bdm-flimfest-dev',
                Key: `${thumbnail}`, // Object key in S3
                Body: req.files.thumbnail[0].buffer, // File buffer to be uploaded
            };

            // Upload the file to S3
            s3.upload(params1, (err, data) => {
                if (err) {
                    console.error('S3 upload error:', err);
                    return res.status(500).json({ error: 'Error uploading thumbnail file to S3' });
                }
            });

            const params2 = {
                Bucket: 'bdm-flimfest-dev',
                Key: `${banner}`, // Object key in S3
                Body: req.files.banner[0].buffer, // File buffer to be uploaded
            };

            s3.upload(params2, (err, data) => {
                if (err) {
                    console.error('S3 upload error:', err);
                    return res.status(500).json({ error: 'Error uploading banner file to S3' });
                }
            });
        }
        else {
            thumbnail = undefined;
            banner = undefined;
        }

        try {
            const filmExit = await Festival.exists({ title });

            if (filmExit) {
                const error = {
                    status: 409,
                    message: "festival Already Exit",
                }

                return next(error);
            }
        }
        catch (error) {
            return next(error);
        }

        let festival;

        try {
            festival = new Festival({
                title,
                thumbnail,
                banner,
                duration,
                genre: gendata,
                actor: actData,
                director: dirData,
                producer: prodData,
                filmmaker: filmkrData,
                rating,
                ads_url,
                short_description,
                long_description,
                trailer,
                stream_file,
                status,
                type
            })

            festivalUser = await festival.save()
        }
        catch (error) {
            return next(error);
        }

        let message = "festival Added Successfully";
        return res.status(201).json({ festivalUser, message });
        //return res.status(201).json('test')
    },
    async getAllfestival(req, res, next) {
        //console.log("hello")

        try {

            const cat_id = await Category.findOne({ cat_name: 'Festival', status: 'A' });
            // const festivalData = await Festival.find({});
            if (cat_id) {
                let categoryId = cat_id._id
                const festivalData = await Film.find({ status: 'A', category: categoryId }, '_id title thumbnail banner trailer stream_file status duration rating actor director filmmaker producer short_description long_description type')
                    .populate('actor', 'actor_name social_link')
                    .populate('director', 'director_name social_link')
                    .populate('producer', 'producer_name social_link')
                    .populate('filmmaker', 'name social_link image')
                    .populate('genre', 'genre');

                //filmDTO
                //const filmdto = new filmDTO(films);
                const festival = [];

                for (let i = 0; i < festivalData.length; i++) {
                    const dto = new DataDTO(festivalData[i]);
                    const vote = await festivalController.voteCount(festivalData[i]._id);
                    festival.push(dto);
                    festival[i]['is_vote'] = vote;
                }

                if (festival) {
                    return res.status(200).json({ festival });
                }
            }
            else {
                let festival = [];
                let message = 'No festival found'
                return res.status(404).json({ festival, message })
            }
        }
        catch (error) {
            return next(error);
        }
    },

    async removefestival(req, res, next) {
        const deleteSchema = Joi.object({
            id: Joi.string().required(),
        });

        const { error } = deleteSchema.validate(req.params);

        if (error) {
            return next(error);
        }

        const { id } = req.params;

        try {
            const festivalData = await Festival.findById({ _id: id });
            //console.log(festivalData)
            if (festivalData.thumbnail !== undefined) {
                const thumb = {
                    Bucket: 'bdm-flimfest-dev',
                    Key: festivalData.thumbnail,
                };

                s3.deleteObject(thumb, (err, data) => {
                    if (err) {
                        console.error('Error deleting file from S3:', err);
                    } else {
                        console.log('thumbnail deleted successfully');
                    }
                });
            }
            if (festivalData.banner !== undefined) {
                const banner = {
                    Bucket: 'bdm-flimfest-dev',
                    Key: festivalData.banner,
                };

                s3.deleteObject(banner, (err, data) => {
                    if (err) {
                        console.error('Error deleting file from S3:', err);
                    } else {
                        // console.log('banner deleted successfully');
                    }
                });
            }

            if (festivalData.trailer !== undefined) {
                const trailer = {
                    Bucket: 'bdm-flimfest-dev',
                    Key: festivalData.trailer,
                };

                s3.deleteObject(trailer, (err, data) => {
                    if (err) {
                        //console.error('Error deleting file from S3:', err);
                    } else {
                        //console.log('trailer deleted successfully');
                    }
                });
            }
            if (festivalData.stream_file !== undefined) {
                const stream_file = {
                    Bucket: 'bdm-flimfest-dev',
                    Key: festivalData.stream_file,
                };

                s3.deleteObject(stream_file, (err, data) => {
                    if (err) {
                        console.error('Error deleting file from S3:', err);
                    } else {
                        //console.log('File deleted successfully');
                    }
                });
            }

            const deleteData = await Festival.deleteOne({ _id: id });

            const { deletedCount } = deleteData;

            if (!deletedCount) {
                return res.status(404).json({ message: "festival Not Exist" });
            }
        }
        catch (error) {
            return next(error);
        }

        return res.status(200).json({ message: "Deleted Successfully" });

    },

    async updatefestival(req, res, next) {
        //console.log(req.body);

        const { title, duration, genre, actor, director, producer, filmmaker, rating, ads_url, short_description, long_description, status, trailer, stream_file, id } = req.body;
        //console.log(filmmaker)
        const gendata = genre.split(',');
        const actData = actor.split(',');
        const dirData = director.split(',');
        const prodData = producer.split(',');
        const filmkrData = filmmaker.split(',');

        let thumbnail, banner
        if (req.files['thumbnail'] !== undefined) {

            thumbnail = Date.now() + '-' + req.files.thumbnail[0].originalname


            const params = {
                Bucket: 'bdm-flimfest-dev',
                Key: `${thumbnail}`, // Object key in S3
                Body: req.files.thumbnail[0].buffer, // File buffer to be uploaded
            };

            // Upload the file to S3
            s3.upload(params, (err, data) => {
                if (err) {
                    //console.error('S3 upload error:', err);
                    return res.status(500).json({ error: 'Error uploading file to S3' });
                }
            });
        }
        else {
            thumbnail = undefined;
        }
        if (req.files['banner'] !== undefined) {

            banner = Date.now() + '-' + req.files.banner[0].originalname


            const params1 = {
                Bucket: 'bdm-flimfest-dev',
                Key: `${banner}`, // Object key in S3
                Body: req.files.banner[0].buffer, // File buffer to be uploaded
            };

            // Upload the file to S3
            s3.upload(params, (err, data) => {
                if (err) {
                    //console.error('S3 upload error:', err);
                    return res.status(500).json({ error: 'Error uploading file to S3' });
                }
            });
        }
        else {
            banner = undefined;
        }


        //console.log(filename);
        try {

            const filmData = await Festival.findById({ _id: id });
            if (thumbnail === undefined || banner === undefined) {
                const updateStatus = await Festival.updateOne({ _id: id },
                    {
                        title,
                        duration,
                        genre: gendata,
                        actor: actData,
                        director: dirData,
                        producer: prodData,
                        filmmaker: filmkrData,
                        rating,
                        ads_url,
                        short_description,
                        long_description,
                        trailer,
                        stream_file,
                        status,
                        type
                    });
            }
            if (thumbnail !== undefined && banner === undefined) {
                const params = {
                    Bucket: 'bdm-flimfest-dev',
                    Key: filmData.thumbnail,
                };

                s3.deleteObject(params, (err, data) => {
                    if (err) {
                        console.error('Error deleting file from S3:', err);
                    } else {
                        console.log('File deleted successfully');
                    }
                });


                const updateStatus = await Festival.updateOne({ _id: id },
                    {
                        title,
                        thumbnail,
                        duration,
                        genre: gendata,
                        actor: actData,
                        director: dirData,
                        producer: prodData,
                        filmmaker,
                        rating,
                        ads_url,
                        short_description,
                        long_description,
                        trailer,
                        stream_file,
                        status,
                        type
                    });
            }
            if (banner !== undefined && thumbnail === undefined) {
                const updateStatus = await Festival.updateOne({ _id: id },
                    {
                        title,
                        banner,
                        duration,
                        genre: gendata,
                        actor: actData,
                        director: dirData,
                        producer: prodData,
                        filmmaker,
                        rating,
                        ads_url,
                        short_description,
                        long_description,
                        trailer,
                        stream_file,
                        status,
                        type
                    });
            }

            if (banner !== undefined && thumbnail !== undefined) {
                const updateStatus = await Festival.updateOne({ _id: id },
                    {
                        title,
                        banner,
                        thumbnail,
                        duration,
                        genre: gendata,
                        actor: actData,
                        director: dirData,
                        producer: prodData,
                        filmmaker,
                        rating,
                        ads_url,
                        short_description,
                        long_description,
                        trailer,
                        stream_file,
                        status,
                        type
                    });
            }
        }
        catch (error) {
            return next(error);
        }

        return res.status(200).json({ message: "festival Updated Successfully" });
        //return res.status(200).json({message: "test"});
    },

    async getfestivalById(req, res, next) {
        const getSchema = Joi.object({
            id: Joi.string().required(),
        });

        const { error } = getSchema.validate(req.params);

        if (error) {
            return next(error);
        }

        const { id } = req.params;

        try {
            const filmData = await Festival.findById({ _id: id }).populate('genre').populate('actor')
                .populate('director')
                .populate('producer')
                .populate('filmmaker');
            const festival = filmData;

            if (!festival) {
                return res.status(404).json({ message: "festival Not Exist" });
            }
            else {
                return res.status(200).json({ festival });
            }
        }
        catch (error) {
            return next(error);
        }

    },
    async getfestival(req, res, next) {
        //console.log("hello")

        const { user_id } = req.params;

        try {
            const cat_id = await Category.findOne({ cat_name: 'Festival', status: 'A' });
            //console.log(cat_id);


            if (cat_id) {
                let categoryId = cat_id._id
                const festivalData = await Film.find({ status: 'A', category: categoryId }, '_id title thumbnail banner trailer stream_file duration rating actor director filmmaker producer short_description long_description type').populate('actor', 'actor_name social_link')
                    .populate('director', 'director_name social_link')
                    .populate('producer', 'producer_name social_link')
                    .populate('filmmaker', 'name social_link image')
                    .populate('genre', 'genre');

                //filmDTO
                //const filmdto = new filmDTO(films);
                const festival = [];

                for (let i = 0; i < festivalData.length; i++) {
                    const dto = new DataDTO(festivalData[i]);
                    festival.push(dto);
                    festival[i]['type'] = "F";
                    festival[i]['is_fav'] = false;
                    festival[i]['is_vote'] = user_id ? await festivalController.checkVote(user_id, festivalData[i]['_id']) : false;
                }

                if (festival) {
                    return res.status(200).json({ festival });
                }
            }
            else {
                let festival = [];
                let message = 'No festival found'
                return res.status(404).json({ festival, message })
            }


        }
        catch (error) {
            return next(error);
        }
    },
    async checkVote(user_id, fest_id) {
        const data = await Vote.find({ user: user_id, festival: fest_id });
        if (data.length > 0) {
            return true;
        }
        else {
            return false;
        }
    },
    async voteCount(fest_id) {
        //console.log(fest_id);
        const data = await Vote.find({ festival: fest_id });

        if (data.length > 0) {
            return data.length;
        }
        else {
            return 'N/A';
        }
    },
}

module.exports = festivalController;