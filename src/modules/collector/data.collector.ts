import prompts from 'prompts';
import { AWS_QUESTION, DATABASE_QUESTION } from "../../data/question.ts";
import type { RawAnswers } from '../../types/raw-answers.type.ts';
import type { UserAnswers } from '../../types/answer.type.ts';
import type { AwsService } from '../../types/template.type.ts';

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
};

export function normalizeAnswers(raw: RawAnswers): UserAnswers {
    const awsList: AwsService[] = raw.aws ?? [];
    const normalizedAws = awsList.length === 0 ? null : { services: awsList };

    const databaseAnswer = raw.database ?? "none";
    const normalizedDatabase =
        !databaseAnswer || databaseAnswer === "none"
            ? null
            : { provider: databaseAnswer };
    return {
        aws: normalizedAws,
        database: normalizedDatabase,
    }

}