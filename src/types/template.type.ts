export type AwsService =
  | "lambda"
  | "logger"
  | "api-gateway"
  | "secrets-manager" 
  | "dynamodb";

export type DatabaseProvider =
  | "mongodb"
  | "dynamodb";

export interface TemplateMap {
  base: string;

  features: {
    aws: Record<AwsService, string>;

    database: Record<DatabaseProvider, string>; 
  };
}