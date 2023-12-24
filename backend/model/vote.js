const mongoose = require('mongoose');

const { Schema } = mongoose;

const voteSchema = new Schema({
    user: {type: mongoose.SchemaTypes.ObjectId, ref:'User'},
    festival: {type: mongoose.SchemaTypes.ObjectId, ref:'Film'},
},
    {timestamps: true}
);

module.exports = mongoose.model('Vote', voteSchema, 'votes');