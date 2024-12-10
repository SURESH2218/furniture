import aws from "aws-sdk";
import ApiError from "../utils/ApiError.js";

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new aws.S3();

export const uploadToS3 = async (fileBuffer, fileName, fileMimeType) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${Date.now()}-${fileName}`,
    Body: fileBuffer,
    ContentType: fileMimeType,
  };

  try {
    const data = await s3.upload(params).promise();
    return data.Location;
  } catch (error) {
    throw ApiError(500, `Error uploading file to S3: ${error.message}`);
  }
};
