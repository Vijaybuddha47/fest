const mongoose = require('mongoose');

const { Schema } = mongoose;

const filmmakerSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String,default: undefined},
    social_link: {type: String ,default: undefined},
    description: {type: String ,default: undefined},
    status: {type: String, maxlength:1, default: 'A'},

},
    {timestamps: true},
)

module.exports = mongoose.model('Filmmaker' ,filmmakerSchema, 'filmmakers');