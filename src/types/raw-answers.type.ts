
import type { AwsService, DatabaseProvider } from "./template.type";
export interface RawAnswers { 
  aws: AwsService[];
  database: DatabaseProvider | "none";
}