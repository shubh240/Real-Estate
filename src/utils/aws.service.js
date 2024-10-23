import AWS from "aws-sdk";
import { AWS_STORAGE_BUCKET_NAME, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_S3_REGION_NAME } from "../app.config";

let config = {
  region: AWS_S3_REGION_NAME,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY,
};

AWS.config.update(config);

export const uploadImageOnAWS = async (file, folder) => {
  const s3 = new AWS.S3();
  let extention = file.type?.split("/");
  const fileName = `${new Date().getTime()}${extention?.[0] === "image" ? ".png" : "." + extention?.[1]
    }`;
  const params = {
    Bucket: AWS_STORAGE_BUCKET_NAME,
    Key: `${folder}/${fileName}`,
    Body: file,
    ACL: "public-read-write",
  };


  try {
    await s3.upload(params).promise();
    return fileName;
  } catch (error) {
    console.log('error :', error);
    throw error;
  }
};
