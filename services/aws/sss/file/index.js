require('dotenv').config()
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3')
const fs = require('fs')
const { fileFilter } = require('../../../../helpers/imageUploader')
const uuid = require('uuid').v4

const AWS_PUBLIC_KEY=process.env.AWS_PUBLIC_KEY
const AWS_SECRET_KEY=process.env.AWS_SECRET_KEY
const AWS_BUCKET_NAME=process.env.AWS_BUCKET_NAME
const AWS_BUCKET_REGION=process.env.AWS_BUCKET_REGION


const client = new S3Client({ region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY,
    }
})

async function uploadFile(imageName,imageBuffer,imageUrl,imageMimetype){

    

    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: `${imageName}-${imageUrl}`,
        Body: imageBuffer,
        ACL: 'public-read',
        ContentType: imageMimetype

    }
    const command = new PutObjectCommand(uploadParams)
    return await client.send(command)   
}


module.exports = {
    uploadFile
}