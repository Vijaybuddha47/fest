const Joi = require("joi");
const Film = require("../model/film");
const SliderDTO = require('../dto/slider');

sliderController={

        async getSliderData(req,res,next){
            try{
                const sliderData = await Film.find({ is_slider: 'Y' });
                //const sliderdata = new SliderDTO(slider);

                const slider = [];

                for (let i = 0; i < sliderData.length; i++) {
                const dto = new SliderDTO(sliderData[i]);
                slider.push(dto);
                }

                if(slider)
                {
                    return res.status(200).json({slider});
                }
                else
                {
                    return res.status(404).json({slider})
                }
                
    
            }
            catch(error)
            {
                return next(error);
            }
        },
        async removeSlider(req,res,next)
        {
            const {id} = req.params;
            const is_slider = 'N'
            const updateStatus = await Film.updateOne({_id: id},
                {
                    is_slider
                });

                return res.status(200).json({message: "Slider Deleted Successfully"});
        }
        
}

module.exports = sliderController;