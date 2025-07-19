const mongoose = require("mongoose");

glbModelSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please provide a name for model'],
        trim:true,
        unique:true
    },
    fileId:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    fileName:{
        type:String,
        required:true
    },
    contentType:{
        type:String,
        required:true
    },
},{timestamps:true});

const GlbModel = mongoose.model('GlbModel',glbModelSchema);

module.exports = GlbModel