const Joi = require("joi");
const Film = require("../model/film");
const aws = require('aws-sdk');
const s3 = new aws.S3({
  credentials: {
    accessKeyId: 'AKIAR6ITYLIGB5BKCG2A',
    secretAccessKey: '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',
  },
  region: 'us-east-1',
  useAccelerateEndpoint: true,

});
const filmDTO = require('../dto/film');
const categoryController = require("./categoryController");

// let type = 'M';

filmController = {
  async addfilm(req, res, next) {
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

    const { title, duration, genre, actor, director, producer, filmmaker, rating, ads_url, short_description, long_description, is_slider, status, trailer, stream_file, category, production_company } = req.body;
    const gendata = genre.split(',');
    const actData = actor.split(',');
    const dirData = director.split(',');
    const prodData = producer.split(',');
    const filmkrData = filmmaker.split(',');

    let type = 'M';
    const filmType = categoryController.typeCheck(category)
      .then((res) => {
        type = res;
        return;
      })
      .catch((error) => {
        return;
      });

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



    let order = 1;
    try {
      const filmExit = await Film.exists({ title });
      const tot = await Film.find({});
      // console.log(tot.length)
      order = order + (tot.length);
      if (filmExit) {
        const error = {
          status: 409,
          message: "film Already Exit",
        }

        return next(error);
      }
    }
    catch (error) {
      return next(error);
    }

    let film;

    try {
      film = new Film({
        title,
        thumbnail,
        banner,
        duration,
        genre: gendata,
        actor: actData,
        director: dirData,
        producer: prodData,
        filmmaker: filmkrData,
        category,
        rating,
        ads_url,
        order,
        production_company,
        short_description,
        long_description,
        is_slider,
        trailer,
        stream_file,
        status,
        type
      })

      filmUser = await film.save()
    }
    catch (error) {
      return next(error);
    }

    let message = "film Added Successfully";
    return res.status(201).json({ filmUser, message });
    //return res.status(201).json('test')
  },
  async getAllfilm(req, res, next) {

    try {
      const filmData = await Film.find({});
      const film = [];

      for (let i = 0; i < filmData.length; i++) {
        const dto = new filmDTO(filmData[i]);
        film.push(dto);
      }

      if (film) return res.status(200).json({ film });
      else return res.status(404).json({ film })

    }
    catch (error) {
      return next(error);
    }
  },

  async removefilm(req, res, next) {
    const deleteSchema = Joi.object({
      id: Joi.string().required(),
    });

    const { error } = deleteSchema.validate(req.params);

    if (error) {
      return next(error);
    }

    const { id } = req.params;

    try {
      const filmData = await Film.findById({ _id: id });
      console.log(filmData);
      if (filmData.thumbnail !== undefined) {
        const thumb = {
          Bucket: 'bdm-flimfest-dev',
          Key: filmData.thumbnail,
        };

        s3.deleteObject(thumb, (err, data) => {
          if (err) {
            console.error('Error deleting file from S3:', err);
          } else {
            console.log('thumbnail deleted successfully');
          }
        });
      }
      if (filmData.banner !== undefined) {
        const banner = {
          Bucket: 'bdm-flimfest-dev',
          Key: filmData.banner,
        };

        s3.deleteObject(banner, (err, data) => {
          if (err) {
            console.error('Error deleting file from S3:', err);
          } else {
            // console.log('banner deleted successfully');
          }
        });
      }

      if (filmData.trailer !== undefined) {
        const trailer = {
          Bucket: 'bdm-flimfest-dev',
          Key: filmData.trailer,
        };

        s3.deleteObject(trailer, (err, data) => {
          if (err) {
            //console.error('Error deleting file from S3:', err);
          } else {
            //console.log('trailer deleted successfully');
          }
        });
      }
      if (filmData.stream_file !== undefined) {
        const stream_file = {
          Bucket: 'bdm-flimfest-dev',
          Key: filmData.stream_file,
        };

        s3.deleteObject(stream_file, (err, data) => {
          if (err) {
            console.error('Error deleting file from S3:', err);
          } else {
            //console.log('File deleted successfully');
          }
        });
      }

      const deleteData = await Film.deleteOne({ _id: id });

      const { deletedCount } = deleteData;

      if (!deletedCount) {
        return res.status(404).json({ message: "film Not Exist" });
      }
    }
    catch (error) {
      return next(error);
    }

    return res.status(200).json({ message: "Deleted Successfully" });

  },

  async updatefilm(req, res, next) {
    // console.log(req.body);

    const { title, duration, genre, actor, director, producer, filmmaker, rating, ads_url, short_description, long_description, is_slider, status, trailer, stream_file, id, category, production_company } = req.body;
    // console.log(filmmaker);

    const gendata = genre.split(',');
    const actData = actor.split(',');
    const dirData = director.split(',');
    const prodData = producer.split(',');
    const filmkrData = filmmaker.split(',');

    let type = 'M';
    const filmType = categoryController.typeCheck(category)
      .then((res) => {
        type = res;
        return;
      })
      .catch((error) => {
        return;
      });

    // console.log(filmkrData);

    // const filmmakerIds = filmkrData.map((item) => {
    //   console.log(item);
    //   if (id.match(/^[0-9a-fA-F]{24}$/)) console.log("true")
    //   else console.log("false");
    //   return item
    // });

    // console.log(filmmakerIds);

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
      s3.upload(params1, (err, data) => {
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

      const filmData = await Film.findById({ _id: id });
      if (thumbnail === undefined || banner === undefined) {
        const updateStatus = await Film.updateOne({ _id: id },
          {
            title,
            duration,
            genre: gendata,
            actor: actData,
            director: dirData,
            producer: prodData,
            filmmaker: filmkrData,
            rating,
            category,
            ads_url,
            production_company,
            short_description,
            long_description,
            is_slider,
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


        const updateStatus = await Film.updateOne({ _id: id },
          {
            title,
            thumbnail,
            duration,
            genre: gendata,
            actor: actData,
            director: dirData,
            producer: prodData,
            filmmaker,
            category,
            rating,
            ads_url,
            production_company,
            short_description,
            long_description,
            is_slider,
            trailer,
            stream_file,
            status,
            type
          });
      }
      if (banner !== undefined && thumbnail === undefined) {
        const updateStatus = await Film.updateOne({ _id: id },
          {
            title,
            banner,
            duration,
            genre: gendata,
            actor: actData,
            director: dirData,
            producer: prodData,
            filmmaker,
            category,
            rating,
            ads_url,
            production_company,
            short_description,
            long_description,
            is_slider,
            trailer,
            stream_file,
            status,
            type
          });
      }

      if (banner !== undefined && thumbnail !== undefined) {
        const updateStatus = await Film.updateOne({ _id: id },
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
            category,
            rating,
            ads_url,
            production_company,
            short_description,
            long_description,
            is_slider,
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

    return res.status(200).json({ message: "film Updated Successfully" });
  },

  async getfilmById(req, res, next) {
    const getSchema = Joi.object({
      id: Joi.string().required(),
    });

    const { error } = getSchema.validate(req.params);

    if (error) {
      return next(error);
    }

    const { id } = req.params;

    try {
      const filmData = await Film.findById({ _id: id })
        .populate('genre')
        .populate('actor')
        .populate('director')
        .populate('producer')
        .populate('filmmaker');

      const film = filmData;
      //const film = new filmDTO(filmData);
      //console.log(filmData)
      // for (let i = 0; i < filmData.length; i++) {
      //   const dto = new filmDTO(filmData[i]);
      //   film.push(dto);
      // } 
      // ;
      // film.thumbnail = process.env.CLOUD_CDN+film.thumbnail
      // film.banner = process.env.CLOUD_CDN+film.banner
      //console.log(film.thumbnail)
      if (!film) {
        return res.status(404).json({ message: "film Not Exist" });
      }
      else {
        return res.status(200).json({ film });
      }
    }
    catch (error) {
      return next(error);
    }

  },
  async removefile(req, res, next) {

    //console.log(req.params)
    const { id } = req.params;
    const thumb = {
      Bucket: 'bdm-flimfest-dev',
      Key: id,
    };

    s3.deleteObject(thumb, (err, data) => {
      if (err) {
        console.error('Error deleting file from S3:', err);
      } else {
        console.log('thumbnail deleted successfully');
      }
    });

    return res.status(200).json({ message: "Deleted Successfully" });

  },
}

module.exports = filmController;