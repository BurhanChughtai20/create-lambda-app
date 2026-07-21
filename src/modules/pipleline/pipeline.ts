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
 
const describeValidationFailures = (validation: ValidationResult): string[] => {
  const failures: string[] = [];

  if (!validation.hasPackageJson) {
    failures.push("No package.json found in the target directory.");
  }
  if (!validation.hasExpress) {
    failures.push("Express is not installed in this project.");
  }
  if (!validation.hasTypeScript) {
    failures.push("TypeScript is not installed in this project.");
  }
  if (!validation.nodeVersionOk) {
    failures.push("Installed Node.js version does not meet the minimum required version.");
  }

  return failures;
};

const steps: Step[] = [
  { 
    name: "validateProject",
    run: (ctx) => {
      const validation = validateProject(ctx.cwd);
      const failures = describeValidationFailures(validation);

      if (failures.length > 0) {
        throw new Error(`Project validation failed:\n- ${failures.join("\n- ")}`);
      }

      return { ...ctx, validation };
    },
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
      if (!ctx.templatePaths || ctx.templatePaths.length === 0) {
        throw new Error(
          "templatePaths missing or empty — collectTemplatePaths must run first and return at least one path."
        );
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

  { 
    name: "writePackageJson",
    run: (ctx) => {
      if (!ctx.finalPackageJson) {
        throw new Error("finalPackageJson missing — mergePackageJsons must run first.");
      }

      const outputPath = path.join(ctx.cwd, "package.json");
      fs.writeJsonSync(outputPath, ctx.finalPackageJson, { spaces: 2 });

      return ctx;
    },
  },
];

export const executePipeline = (initialContext: Context): Context => {
  let current = initialContext;

  for (const step of steps) {
    try {
      current = step.run(current);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(`Pipeline failed at step "${step.name}": ${message}`);
    }
  }

  return current;
};