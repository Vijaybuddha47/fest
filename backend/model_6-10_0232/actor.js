const mongoose = require('mongoose');

const { Schema } = mongoose;

const actorSchema = new Schema({
    actor_name: {type: String, required: true},
    social_link: {type: String,default: undefined},
    status: { type: String,maxlength:1,default: 'A'},
},
    {timestamps: true}
);

module.exports = mongoose.model('Actor', actorSchema, 'actors');