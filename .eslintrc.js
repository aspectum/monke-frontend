const a11yOff = Object.keys(require('eslint-plugin-jsx-a11y').rules).reduce((acc, rule) => {
    acc[`jsx-a11y/${rule}`] = 'off';
    return acc;
}, {});

module.exports = {
    root: true,
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 12,
    },
    ignorePatterns: ['/node_modules', '/dist', '.eslintrc.js'], // directories to ignore
    plugins: ['@typescript-eslint', 'prettier', 'react', 'react-hooks'],
    extends: ['airbnb-typescript', 'plugin:react/recommended', 'plugin:prettier/recommended'],
    rules: {
        ...a11yOff,
        'import/prefer-default-export': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/require-default-props': 'off',
        'react/state-in-constructor': 'off',
        'react/destructuring-assignment': 'off',
    },
};
