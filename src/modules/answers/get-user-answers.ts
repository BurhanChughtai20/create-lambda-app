import type { UserAnswers } from "../../types/answer.type.ts";
import { collectAnswers, normalizeAnswers } from "../collector/data.collector.ts";

export async function getUserAnswers(): Promise<UserAnswers> {
    const rawAnswers = await collectAnswers();

    const normalizedAnswers = normalizeAnswers(rawAnswers);

    return normalizedAnswers;
};