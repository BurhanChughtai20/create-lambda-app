import fs from "node:fs";
import path from "node:path";

export const copyDirectory = (
    sourceDir: string,
    destination: string
): void => {

    const entries: fs.Dirent[] = fs.readdirSync(sourceDir, { withFileTypes: true });

    for (const entry of entries) {
        const sourcePath = path.join(sourceDir, entry.name);
        const destinationPath = path.join(destination, entry.name);

        if (entry.isDirectory()) {
            fs.mkdirSync(destinationPath, {
                recursive: true,
            });
            copyDirectory(sourcePath, destinationPath);
        }
        else {
            fs.copyFileSync(sourcePath, destinationPath);
        };
    };
};