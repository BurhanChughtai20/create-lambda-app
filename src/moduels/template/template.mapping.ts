import type { UserAnswers } from "../../types/answer.type";
import TEMPLATE_MAP from "../../data/template.data";

export const collectTemplatePaths = (answers: UserAnswers): string[] => {

    const template:string[] = [TEMPLATE_MAP.base];

    const paths = template;

    if(answers.aws) {
        for(const service of answers.aws.services) {
            paths.push(TEMPLATE_MAP.features.aws[service]);
        }
    };

    if(answers.database) {
        paths.push(TEMPLATE_MAP.features.database[answers.database.provider]);
    };
    
    return paths;
};