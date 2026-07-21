
import type { AwsService, DatabaseProvider } from "./template.type.ts";
export interface RawAnswers { 
  aws: AwsService[];
  database: DatabaseProvider | "none";
}