const AWS = require('aws-sdk');
require("dotenv").config();
const s3 = new AWS.S3({
    accessKeyId: process.env.YOUR_ACCESS_KEY,
    secretAccessKey: process.env.YOUR_SECRET_KEY,
    region: process.env.YOUR_BUCKET_REGION,
    useAccelerateEndpoint: true,
  });
const bucketName = process.env.YOUR_BUCKET_NAME;
fileuploadController = {
    
    async initiateUpload(req, res)
    {
        console.log("Raj_initiate");
        try {
            const { fileName } = req.body;
            const params = {
              Bucket: bucketName,
              Key: fileName,
            };
            const upload = await s3.createMultipartUpload(params).promise();
            res.json({ uploadId: upload.UploadId });
          } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Error initializing upload' });
          }
    },

    async fileUpload(req, res)
    {
        const { index, fileName } = req.body;
        const file = req.file;
        console.log("Raj_upload");
        const s3Params = {
            Bucket: bucketName,
            Key: fileName,
            Body: file.buffer,
            PartNumber: Number(index) + 1,
            UploadId: req.query.uploadId
        };

        s3.uploadPart(s3Params, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ success: false, message: 'Error uploading chunk' });
            }

            return res.json({ success: true, message: 'Chunk uploaded successfully' });
        });
    },
    async uploadComplete(req, res)
    {
        console.log("Raj_final");
        const { fileName } = req.query;
        const s3Params = {
            Bucket: bucketName,
            Key: fileName,
            UploadId: req.query.uploadId,
        };

        s3.listParts(s3Params, (err, data) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ success: false, message: 'Error listing parts' });
            }

            const parts = [];
            data.Parts.forEach(part => {
                parts.push({
                    ETag: part.ETag,
                    PartNumber: part.PartNumber
                });
            });

            s3Params.MultipartUpload = {
                Parts: parts
            };

            s3.completeMultipartUpload(s3Params, (err, data) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ success: false, message: 'Error completing upload' });
                }

                console.log("data: ", data)
                return res.json({ success: true, message: 'Upload complete', data: data.Location});
            });
        });
    }

}
module.exports = fileuploadController;