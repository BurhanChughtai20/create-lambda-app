import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { databaseConfig } from "../config/database.ts";

export const dynamoClient = new DynamoDBClient({
  region: databaseConfig.region,

  ...(databaseConfig.endpoint && {
    endpoint: databaseConfig.endpoint,
  }),
});

export function getTableName(): string {
  return databaseConfig.tableName;
}