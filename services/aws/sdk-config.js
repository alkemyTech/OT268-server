const AWS = require('aws-sdk');

const {
  AWS_S3_BUCKET_REGION,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_S3_BUCKET_NAME,
} = process.env;

class FileStorage {
  clientConfig = {
    accessKey: AWS_ACCESS_KEY_ID,
    secretKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_S3_BUCKET_REGION,
  };

  #bucketName = AWS_S3_BUCKET_NAME;

  constructor() {
    this.client = new AWS.S3(this.#clientConfig);
  }
}

module.exports = new FileStorage();
