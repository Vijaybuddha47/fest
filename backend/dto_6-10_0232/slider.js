class SliderDTO{
    constructor (slider)
    {
        //console.log(slider._id)
        this._id = slider._id;
        this.banner = slider.banner;
        this.title = slider.title;
    }
}

module.exports = SliderDTO;