const { boolean } = require('joi');
const mongoose = require('mongoose');

const {Schema} = mongoose;

const genreSchema = new Schema({
    genre: {type: String, required: true},
    status: {type: String, maxlength:1, default: 'A'},

},
    {timestamps: true}
);

module.exports = mongoose.model('Genre', genreSchema, 'genres');