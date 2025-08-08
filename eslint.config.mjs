// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [...compat.extends("next/core-web-vitals", "next/typescript"), {
  plugins: {
    import: (await import("eslint-plugin-import")).default,
    "jsx-a11y": (await import("eslint-plugin-jsx-a11y")).default,
    "unused-imports": (await import("eslint-plugin-unused-imports")).default,
  },
  rules: {
    // Import rules
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true },
      },
    ],
    // Accessibility rules
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/aria-role": "error",
    "jsx-a11y/no-redundant-roles": "error",
    // Unused imports
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
}, // Server component restrictions
{
  files: ["src/components/server/**/*.{ts,tsx}", "src/lib/**/*.{ts,tsx}"],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["react", "react-dom"],
            importNames: ["useState", "useEffect", "useRef", "useCallback"],
            message: "React hooks are not allowed in server components",
          },
        ],
      },
    ],
  },
}, // Client component restrictions
{
  files: [
    "src/components/client/**/*.{ts,tsx}",
    "src/lib-client/**/*.{ts,tsx}",
  ],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: ["@/lib/**"],
            message:
              "Server-only utilities cannot be imported in client components",
          },
        ],
      },
    ],
  },
}, ...storybook.configs["flat/recommended"]];

export default eslintConfig;
