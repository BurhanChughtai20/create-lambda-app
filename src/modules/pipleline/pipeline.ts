import { copyDirectory } from "../copy.directory/copy.directory.ts";
import { collectTemplatePaths } from "../template/template.mapping.ts";
import { validateProject } from "../validate/validation.ts";
import { mergeDeep } from "../merge/merge.package.ts";
import fs from "fs-extra";
import path from "node:path";
import type { UserAnswers } from "../../types/answer.type.ts";
import type { ValidationResult } from "../../types/validation.type.ts";

interface Context {
  cwd: string;
  answers: UserAnswers;
  validation?: ValidationResult;
  templatePaths?: string[];
  finalPackageJson?: Record<string, unknown>;
}

type Step = {
  name: string;
  run: (ctx: Context) => Context;
};

const steps: Step[] = [
  {
    name: "validateProject",
    run: (ctx) => ({
      ...ctx,
      validation: validateProject(ctx.cwd),
    }),
  },
  {
    name: "collectTemplatePaths",
    run: (ctx) => ({
      ...ctx,
      templatePaths: collectTemplatePaths(ctx.answers),
    }),
  },
  {
    name: "copyTemplates",
    run: (ctx) => {
      if (!ctx.templatePaths) {
        throw new Error("templatePaths missing — collectTemplatePaths must run first.");
      }
      for (const sourceDir of ctx.templatePaths) {
        copyDirectory(sourceDir, ctx.cwd);
      }
      return ctx;
    },
  },
  {
    name: "mergePackageJsons",
    run: (ctx) => {
      if (!ctx.templatePaths) {
        throw new Error("templatePaths missing — collectTemplatePaths must run first.");
      }

      const finalPackageJson: Record<string, unknown> = {};

      for (const templateDir of ctx.templatePaths) {
        const pkgPath = path.join(templateDir, "package.json");
        if (!fs.existsSync(pkgPath)) continue;

        const templatePkg = fs.readJsonSync(pkgPath);
        mergeDeep(finalPackageJson, templatePkg);
      }

      return { ...ctx, finalPackageJson };
    },
  },
];

export const executePipeline = (initialContext: Context): Context => {
  let current = initialContext;

  for (const step of steps) {
    try {
      current = step.run(current);
    } catch (err: any) {
      throw new Error(`Pipeline failed at step "${step.name}": ${err.message}`);
    }
  }

  return current;
};