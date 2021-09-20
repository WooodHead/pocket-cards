require('dotenv').config({ path: '.env.test' });

import AWS, { DynamoDB, S3 } from 'aws-sdk';

AWS.config.update({
  region: process.env.AWS_REGION,
  s3: { endpoint: process.env.AWS_ENDPOINT },
  sqs: { endpoint: process.env.AWS_ENDPOINT },
  dynamodb: { endpoint: process.env.AWS_ENDPOINT },
});

const s3Client = new S3();
const dbClient = new DynamoDB();

const TABLE_NAME_USERS = process.env.TABLE_NAME_USERS as string;
const TABLE_NAME_GROUPS = process.env.TABLE_NAME_GROUPS as string;
const TABLE_NAME_WORDS = process.env.TABLE_NAME_WORDS as string;
const TABLE_NAME_WORD_MASTER = process.env.TABLE_NAME_WORD_MASTER as string;
const TABLE_NAME_WORD_IGNORE = process.env.TABLE_NAME_WORD_IGNORE as string;
const TABLE_NAME_HISTORIES = process.env.TABLE_NAME_HISTORIES as string;
const BUCKET_NAME_FRONTEND = process.env.BUCKET_NAME_FRONTEND as string;

const teardown = async () => {
  console.log('jest teardown start...');

  const objects = await listObject();

  // remove all objects
  await Promise.all(
    objects.map((item) => s3Client.deleteObject({ Bucket: BUCKET_NAME_FRONTEND, Key: item.Key as string }).promise())
  );

  // delete bucket
  await s3Client.deleteBucket({ Bucket: BUCKET_NAME_FRONTEND }).promise();

  await dbClient.deleteTable({ TableName: TABLE_NAME_USERS }).promise();
  await dbClient.deleteTable({ TableName: TABLE_NAME_GROUPS }).promise();
  await dbClient.deleteTable({ TableName: TABLE_NAME_WORDS }).promise();
  await dbClient.deleteTable({ TableName: TABLE_NAME_WORD_MASTER }).promise();
  await dbClient.deleteTable({ TableName: TABLE_NAME_HISTORIES }).promise();
  await dbClient.deleteTable({ TableName: TABLE_NAME_WORD_IGNORE }).promise();

  console.log('jest teardown end...');
};

export const listObject = async (token?: string): Promise<S3.Object[]> => {
  const results = await s3Client
    .listObjectsV2({
      Bucket: BUCKET_NAME_FRONTEND,
      ContinuationToken: token,
    })
    .promise();

  if (results.NextContinuationToken) {
    const subList = await listObject(results.NextContinuationToken);

    return [...(results.Contents ??= []), ...subList];
  }

  return (results.Contents ??= []);
};

export default teardown;
