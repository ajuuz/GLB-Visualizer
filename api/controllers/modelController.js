const { gridFsUploader } = require("../util/gridFsUploader");
const GlbModel = require('../model/glbModel')
const {GridFSBucket} = require('mongodb');
const { default: mongoose } = require("mongoose");


exports.addNewModel=async(req,res,next)=>{
    try{
        const file = req.file;
        const {name} = req.body
        if(!file){
            res.status(400).json({success:false,message:"File not recieved"});
        }
        const fileDetails = await gridFsUploader(file)
        const newGlbModel = new GlbModel({name,fileId:fileDetails.fileId,fileName:fileDetails.fileName,contentType:file.mimetype})
        await newGlbModel.save();
        return res.status(201).json({success:true,message:'Model Uploaded Successfully'})
    }
    catch(error){
        res.status(500).json({success:false,message:"Error Uploading Model"})
    }
}

exports.getModels=async(req,res,next)=>{
    try{
        const models = await GlbModel.find();
        res.status(200).json(models)
    }
    catch(error){
        res.status(500).json({success:false,message:"Error during Fetching Models"})
    }
}

exports.getModel=async(req,res,next)=>{
    try{
        const modelId = req.params.modelId;
        const model = await GlbModel.findById(modelId);

        if(!model) return res.status(404).json({error:'Model not found'});

        const db = mongoose.connection.db;
        const bucket = new GridFSBucket(db,{bucketName:'models_bucket'});

        const downloadStream = bucket.openDownloadStreamByName(model.fileName);

        res.set('Content-Type',model.contentType);
        res.set('Content-Disposition', `inline; filename="${model.filePath}"`);

        downloadStream.pipe(res)
        .on('error',(error)=>{
            res.status(404).json({ error: 'File not found in GridFS' });
        })
    }
    catch(error){
        res.status(500).json({ error: error.message });
    }
}