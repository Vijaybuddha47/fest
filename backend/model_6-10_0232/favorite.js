const mongoose = require('mongoose');

const { Schema } = mongoose;

const favoriteSchema = new Schema({
    user: {type: mongoose.SchemaTypes.ObjectId, ref:'User'},
    film: {type: mongoose.SchemaTypes.ObjectId, ref:'Film'},
},
    {timestamps: true}
);

module.exports = mongoose.model('Favorite', favoriteSchema, 'favorites');