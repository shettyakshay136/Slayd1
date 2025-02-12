import AWS from 'aws-sdk';

AWS.config.update({
  region: 'ap-south-1',
  accessKeyId: 'AKIA2YICAAKWC6GILFFB',
  secretAccessKey: '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',
});

const s3 = new AWS.S3();

const getPresignedUrl = async (bucketName, imageKey) => {
  const params = {
    Bucket: bucketName,
    Key: imageKey,
    Expires: 300, 
  };
  return s3.getSignedUrlPromise('getObject', params);
};

export { getPresignedUrl };
