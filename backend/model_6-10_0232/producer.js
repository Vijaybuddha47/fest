const mongoose = require('mongoose');

const { Schema } = mongoose;

const producerSchema = new Schema({

    producer_name: {type: String, required:true},
    social_link: {type: String,default: undefined},
    status: { type: String, maxlength:1, default: 'A'},
},
    {timestamps: true}
);

module.exports = mongoose.model('Producer', producerSchema, 'producers');