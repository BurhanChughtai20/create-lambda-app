export interface ValidationResult {
  hasPackageJson: boolean;
  hasExpress: boolean;
  hasTypeScript: boolean;
  nodeVersionOk: boolean;
  packageJson: Record<string, any> | null;
}