const { boolean } = require('joi');
const mongoose = require('mongoose');

const {Schema} = mongoose;

const AppSchema = new Schema({
    name: {type: String, required: true},
    label: {type: String, required: true},
    mail: {type: String, required: true},
    status: {type: String, maxlength:1, default: 'A'},

},
    {timestamps: true}
);

module.exports = mongoose.model('App', AppSchema, 'apps');