const { number } = require('joi');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const festvalSchema = new Schema({
    title: { type: String, requried: true },
    thumbnail: { type: String, requried: true },
    banner: { type: String, requried: true },
    trailer: { type: String, requried: true },
    stream_file: { type: String, requried: true },
    poster: { type: String, requried: true },
    duration: { type: Number, requried: true },
    genre: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Genre' }],
    actor: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Actor' }],
    director: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Director' }],
    producer: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Producer' }],
    filmmaker: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Filmmaker' }],
    rating: { type: String, maxlength: 5 },
    ads_url: { type: String, default: undefined },
    short_description: { type: String, default: undefined },
    long_description: { type: String, default: undefined },
    //is_slider: {type: String, maxlength:1, default: 'N'},
    status: { type: String, maxlength: 1, default: 'A' },
    type: { type: String, maxlength: 1, default: 'F' },

},
    { timestamps: true }

);

module.exports = mongoose.model('Festival', festvalSchema, 'festivals');