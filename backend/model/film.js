const { number } = require('joi');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const filmSchema = new Schema({
    title: { type: String, requried: true },
    thumbnail: { type: String, requried: true },
    banner: { type: String, requried: true },
    trailer: { type: String, requried: true },
    stream_file: { type: String, requried: true },
    poster: { type: String, requried: true },
    duration: { type: Number, requried: true },
    category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
    genre: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Genre' }],
    actor: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Actor' }],
    director: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Director' }],
    producer: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Producer' }],
    filmmaker: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Filmmaker' }],
    rating: { type: String, requried: true },
    order: { type: Number, requried: true },
    production_company: { type: String, requried: true },
    ads_url: { type: String, default: undefined },
    short_description: { type: String, default: undefined },
    long_description: { type: String, default: undefined },
    is_slider: { type: String, maxlength: 1, default: 'N' },
    status: { type: String, maxlength: 1, default: 'A' },
    type: { type: String, maxlength: 1, default: 'M' },

},
    { timestamps: true }

);

module.exports = mongoose.model('Film', filmSchema, 'films');