const { boolean } = require('joi');
const mongoose = require('mongoose');

const {Schema} = mongoose;

const CategorySchema = new Schema({
    cat_name: {type: String, required: true},
    order: {type: Number,  requried: true},
    status: {type: String, maxlength:1, default: 'A'},

},
    {timestamps: true}
);

module.exports = mongoose.model('Category', CategorySchema, 'categories');