import type { PromptObject, PromptType, Choice } from "../types/prompt-question.type";
import type { AwsService, DatabaseProvider } from "../types/template.type";

export const AWS_QUESTION: PromptObject<"aws" | "database"> = {
  name: "aws",
  message: "Which AWS services would you like to include?",
  type: "multiselect" as PromptType,

  choices: [
    {
      title: "AWS Lambda",
      value: "lambda" satisfies AwsService,
    },
    {
      title: "Logger",
      value: "logger" satisfies AwsService,
    },
    {
      title: "API Gateway",
      value: "api-gateway" satisfies AwsService,
    },
    {
      title: "Secrets Manager",
      value: "secrets-manager" satisfies AwsService,
    },
    {
      title: "DynamoDB",
      value: "dynamodb" satisfies AwsService,
    },
  ] as Choice[],
};

export const DATABASE_QUESTION: PromptObject<"aws" | "database"> = {
  name: "database",
  message: "Which database would you like to use?",
  type: "select" as const,

  choices: [
    {
      title: "MongoDB",
      value: "mongodb" satisfies DatabaseProvider,
    },
    {
      title: "DynamoDB",
      value: "dynamodb" satisfies DatabaseProvider,
    },
    {
      title: "None",
      value: "none",
    },
  ] as Choice[],
};