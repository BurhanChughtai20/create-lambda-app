export const databaseConfig = {
  region: process.env.AWS_REGION!,
  endpoint: process.env.DYNAMODB_ENDPOINT,
  tableName: process.env.DYNAMODB_TABLE!,
};