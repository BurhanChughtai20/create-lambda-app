import prompts from 'prompts';
import { AWS_QUESTION, DATABASE_QUESTION } from "../../data/question";
import type { RawAnswers } from '../../types/raw-answers.type';

export async function collectAnswers(): Promise<RawAnswers> {

    const response = await prompts<"aws" | "database">([
  AWS_QUESTION,
  DATABASE_QUESTION,
]);


    const rawAnswers: RawAnswers = {
        aws: response.aws,
        database: response.database,
    };

    return rawAnswers;
}