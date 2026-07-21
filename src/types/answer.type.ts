  import type { AwsService, DatabaseProvider } from "./template.type.ts";

  export interface UserAnswers {
    aws: {
      services: AwsService[];
    } | null;

    database: {
      provider: DatabaseProvider;
    } | null;
  
  }