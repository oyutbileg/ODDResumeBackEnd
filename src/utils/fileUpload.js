const MyError = require("../utils/myerror");
const path = require('path')
const AWS = require('aws-sdk');

exports.fileUpload = async (file, prefix = "", name="anonymous") => new Promise((resolve, reject) => {
  AWS.config.update({
    accessKeyId: process.env.AWS_BUCKET_ID,
    secretAccessKey: process.env.AWS_BUCKET_SECRET,
    region: 'ap-northeast-2'
  });

  // Initializing S3 Interface
  const s3 = new AWS.S3();

  if (!file.mimetype.startsWith('image')) {
    reject(new MyError('Та зураг upload хийнэ үү.', 400))
  }

  if (file.size > process.env.MAX_UPLOAD_FILE_SIZE) {
    reject(new MyError('Зурагны хэмжээ хэтэрсэн байна.', 400))
  }

  file.name = `photo_${name}${path.parse(file.name).ext}`;

  const fileContent = Buffer.from(file.data, 'binary');

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${prefix ? `${prefix}/` : ""}${file.name}`, // file name you want to save as
    Body: fileContent
  };
  s3.upload(params, function (err, data) {
    if (err) {
      reject(err)
    }
    resolve(data)
  });
});
