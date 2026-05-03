import { defineConfig } from "eslint/config";


const eslintConfig = defineConfig([
  {
    ignores: [
      "node_modules/**",
      ".husky/**",
      "dist/**",
      "docs/**",
      "build/**",
      "logs/**",
      "coverage/**",
      "prisma/**",
      "tests/**",
      "*.d.ts"
    ],
    parser: "@typescript-eslint/parser",
    plugins: [ "@typescript-eslint" ],
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:@typescript-eslint/recommended-requiring-type-checking",
      "prettier"
    ],
    parserOptions: {
      project: "./tsconfig.json",
      tsconfigRootDir: __dirname,
      sourceType: "module"
    },
    rules: {
      // TypeScript rules
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error", {
          argsIgnorePattern: "^_"
        }
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-floating-promises": "error",

      // General JS rules
      "no-console": [
        "warn", {
          allow: [
            "warn",
            "error"
          ]
        }
      ],
      "no-var": "error",
      "prefer-const": "error",

      // Style rules
      "semi": [ "error", "always" ],
      "quotes": [ "error", "double" ],
      "indent": [ "error", 2 ]
    }
  }
]);


export default eslintConfig;
