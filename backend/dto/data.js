class DataDTO {
    constructor(slider) {
        //console.log(slider._id)
        this._id = slider._id;
        this.title = slider.title;
        this.banner = 'https://da278ww3jdi3v.cloudfront.net/' + slider.banner;
        this.thumbnail = 'https://da278ww3jdi3v.cloudfront.net/' + slider.thumbnail;
        this.stream_file = 'https://da278ww3jdi3v.cloudfront.net/' + slider.stream_file;
        this.trailer = 'https://da278ww3jdi3v.cloudfront.net/' + slider.trailer;
        this.rating = slider.rating;
        this.duration = slider.duration;
        this.category = slider.category;
        this.actor = slider.actor;
        this.director = slider.director;
        this.filmmaker = slider.filmmaker;
        this.producer = slider.producer;
        this.genre = slider.genre;
        this.status = slider.status;
        this.short_description = slider.short_description;
        this.long_description = slider.long_description;
        this.type = slider.type;
        this.is_fav = slider.is_fav;
        this.is_vote = slider.is_vote;
    }
}

module.exports = DataDTO;