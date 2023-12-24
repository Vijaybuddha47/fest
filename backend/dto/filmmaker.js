
class FilmmakerDTO {
    constructor(filmmaker) {
        //console.log();
        this._id = filmmaker._id;
        this.name = filmmaker.name;
        this.social_link = filmmaker.social_link;
        this.image = filmmaker.image ? 'https://da278ww3jdi3v.cloudfront.net/' + filmmaker.image : undefined;
        this.status = filmmaker.status;
        this.description = filmmaker.description;
        this.createdAt = filmmaker.createdAt;
    }
}
//console.log(FilmmakerDTO);
module.exports = FilmmakerDTO;