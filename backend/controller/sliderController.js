const Joi = require("joi");
const Film = require("../model/film");
const SliderDTO = require('../dto/slider');

sliderController = {

    async getSliderData(req, res, next) {
        try {
            const sliderData = await Film.find({ is_slider: 'Y', status: 'A' }).sort({ order: 1 });
            //const sliderdata = new SliderDTO(slider);

            const slider = [];

            for (let i = 0; i < sliderData.length; i++) {
                const dto = new SliderDTO(sliderData[i]);
                slider.push(dto);
            }

            if (slider) {
                return res.status(200).json({ slider });
            }
            else {
                return res.status(404).json({ slider })
            }


        }
        catch (error) {
            return next(error);
        }
    },
    async removeSlider(req, res, next) {
        const { id } = req.params;
        const is_slider = 'N'
        const updateStatus = await Film.updateOne({ _id: id },
            {
                is_slider
            });

        return res.status(200).json({ message: "Slider Deleted Successfully" });
    },
    async Sliderupdate(req, res, next) {

        const updateSchema = Joi.object({
            id: Joi.string().required(),
            order: Joi.required(),
        });

        const { error } = updateSchema.validate(req.body);

        if (error) return next(error);

        const { id, order } = req.body;

        const orderedData = await Film.find({ _id: { $ne: id }, order: order });

        if (orderedData.length > 0) return res.status(400).json({ message: "Duplicate order. Order must be unique." });

        const updateStatus = await Film.updateOne({ _id: id }, { order });

        return res.status(200).json({ message: "Slider Updated Successfully" });
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
            const slider = new SliderDTO(filmData);
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
            if (!slider) {
                return res.status(404).json({ message: "film Not Exist" });
            }
            else {
                return res.status(200).json({ slider });
            }
        }
        catch (error) {
            return next(error);
        }

    },

}

module.exports = sliderController;