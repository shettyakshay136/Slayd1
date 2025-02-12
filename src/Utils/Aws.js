import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: 'AKIA2YICAAKWC6GILFFB',
  secretAccessKey: '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',
  region: 'ap-south-1',
});

const s3 = new AWS.S3();

export const fetchPresignedUrls = async (imageKey) => {

  const objectKey = imageKey?.split('/').slice(-2).join('/');

  const params = {
    Bucket: 'feed-images-01', 
    Key: objectKey, 
    Expires: 60 * 5, 
  };

  try {
    const url = await s3.getSignedUrlPromise('getObject', params);
    return url;
  } catch (error) {
    console.error('Error generating presigned URL:', error);
    throw new Error('Unable to fetch presigned URL');
  }
};
