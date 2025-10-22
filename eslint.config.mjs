import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname
});

const eslintConfig = [
    ...compat.config({
        extends: [
            "plugin:@typescript-eslint/recommended",
            "plugin:react/recommended",
            "plugin:prettier/recommended"
        ],
        ignorePatterns: [
            "config/*",
            "node_modules/",
            ".prettierrc",
            ".eslintrc.json",
            "dist"
        ],
        rules: {
            // "react/no-unescaped-entities": "off",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "warn",
            "prettier/prettier": [
                "warn",
                {
                    endOfLine: "auto"
                }
            ],
            "react/react-in-jsx-scope": "off",
            quotes: [
                "warn",
                "double",
                { allowTemplateLiterals: true, avoidEscape: true }
            ]
        }
    })
];

export default eslintConfig;
