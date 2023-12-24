const Film = require("../model/film");
const User = require("../model/user");
const Genre = require("../model/genre");
const DataDTO = require('../dto/data');
dashboardController = {
async dashboardData(req, res, next){

    
    try{
        let categories=[];
        const catData = await dashboardController.genData();
        let slider = await dashboardController.sliderData();
        //const stramArr = [];
        for(const cat of catData)
        {
            let catArr;
            const movieData= await dashboardController.filmData(cat._id)
            
            if(movieData.length>0)
            {
                catArr = {
                    'cat_id':cat._id,
                    'cat_name':cat.genre,
                    'streams':movieData
                }
                categories.push(catArr);
            }

        }

        return res.status(200).json({slider,categories});

    }
    catch(error)
    {
        return next(error);
    }
},

async genData()
{
    const catData = await Genre.find({status:'A'}, '_id genre');
    return catData;
},

async filmData(genId)
{
    const movieData = await Film.find({genre:genId},'_id title thumbnail banner trailer stream_file duration actor director filmmaker producer short_description long_description').populate('actor', 'actor_name social_link')
    .populate('director', 'director_name social_link')
    .populate('producer', 'producer_name social_link')
    .populate('filmmaker', 'name social_link image')
    ;

    const movies = [];

                for (let i = 0; i < movieData.length; i++) {
                const dto = new DataDTO(movieData[i]);
                movies.push(dto);
                }
    return movies;
},
async sliderData()
{
    const sliderArr = await Film.find({is_slider:'Y', status:'A'},'_id title thumbnail banner trailer stream_file duration actor director filmmaker producer short_description long_description').populate('actor', 'actor_name')
    .populate('director', 'director_name social_link')
    .populate('producer', 'producer_name social_link')
    .populate('filmmaker', 'name social_link');

    const slider = [];

                for (let i = 0; i < sliderArr.length; i++) {
                const dto = new DataDTO(sliderArr[i]);
                slider.push(dto);
                }


    return slider;
}
}

module.exports = dashboardController;