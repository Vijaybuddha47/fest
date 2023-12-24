class festivalDTO {
    constructor(film) {
        //console.log();
        this._id = film._id;
        this.title = film.title;
        this.duration = film.duration;
        this.thumbnail = 'https://da278ww3jdi3v.cloudfront.net/' + film.thumbnail;
        this.status = film.status;
        this.type = film.type;
        this.createdAt = film.createdAt;
    }
}
//console.log(FilmmakerDTO);
module.exports = festivalDTO;