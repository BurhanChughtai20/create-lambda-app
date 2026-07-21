import type { TemplateMap } from "../types/template.type";

const TEMPLATE_MAP: TemplateMap = {
  base: "templates/base",

  features: {
    aws: {
      lambda: "templates/aws/lambda",

      logger: "templates/aws/logger",

      "api-gateway": "templates/aws/api-gateway",

      "secrets-manager": "templates/aws/secrets-manager",

      dynamodb: "templates/aws/dynamodb",
    },

    database: {
      mongodb: "templates/database/mongodb",

      dynamodb: "templates/database/dynamodb",
    },
 
  },
};

export default TEMPLATE_MAP;