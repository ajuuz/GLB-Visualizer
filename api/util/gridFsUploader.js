const { default: mongoose } = require('mongoose');
const {Readable} = require('stream');
const {GridFSBucket} = require('mongodb')

exports.gridFsUploader=async(file)=>{
    const buffer = file.buffer;
    const readableStream = Readable.from(buffer);

    const db = mongoose.connection.db;
    const bucket = new GridFSBucket(db,{bucketName:'models_bucket'})

    const uploadStream = bucket.openUploadStream(file.originalname,{
        contentType:file.mimeType||'application/octet-stream',
    })

    return new Promise((resolve,reject)=>{
        readableStream.pipe(uploadStream)
        .on('error',(err)=>reject(err))
        .on('finish',()=>resolve({
            fileId:uploadStream.id,
            fileName:uploadStream.filename
        }))
    })
}