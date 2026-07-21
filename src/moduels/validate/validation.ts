import fs from "fs-extra";
import path from "path";
import type { ValidationResult } from "../../types/validation.type.ts";

const MIN_NODE_MAJOR = 16;

export const validateProject = (cwd: string): ValidationResult => {

    const packageJsonPath = path.join(cwd, "package.json");

    const hasPackageJson = fs.existsSync(packageJsonPath);

    if (!hasPackageJson) {
        throw new Error("package.json not found");
    }

    const packageJson = fs.readJSONSync(packageJsonPath);

    const hasExpress = Boolean(
        packageJson.dependencies?.express ||
        packageJson.devDependencies?.express
    );

    const hasTypeScript = Boolean(
        packageJson.dependencies?.typescript ||
        packageJson.devDependencies?.typescript
    );

    const nodeVersionOk = Number(process.version.split(".")[0]) >= MIN_NODE_MAJOR;

    return {
        hasPackageJson,
        hasExpress,
        hasTypeScript,
        nodeVersionOk,
        packageJson
    };
}
