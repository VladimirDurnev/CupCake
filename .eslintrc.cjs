module.exports = {
    root: true,
    env: {browser: true, es2020: true, jest: true},
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh", "import"],
    rules: {
        "react/react-in-jsx-scope": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
        "no-var": "error",
        "prefer-const": "warn",
        semi: ["warn", "always"],
        "arrow-parens": ["warn", "always"],
        "object-curly-spacing": ["warn", "always"],
        "max-len": ["warn", {code: 80}],
        "react-refresh/only-export-components": [
            "warn",
            {allowConstantExport: true},
        ],
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "prettier/prettier": ["warn", {endOfLine: "auto"}],
        "react-hooks/exhaustive-deps": "off",
        "import/order": [
            "warn",
            {
                groups: [
                    "index",
                    "sibling",
                    "parent",
                    "internal",
                    "external",
                    "builtin",
                    "object",
                    "type",
                ],
                "newlines-between": "always-and-inside-groups",
            },
        ],
    },
    settings: {
        react: {
            version: "detect",
        },
    },
};
