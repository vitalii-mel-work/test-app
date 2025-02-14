module.exports = {
    env: {
        node: true,
        es2020: true
    },
    globals: {
        React: true
    },
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended"
    ],
    settings: {
        react: {
            version: "detect"
        }
    }
};
