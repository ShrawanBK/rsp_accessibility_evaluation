module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        allowImportExportEverywhere: true,
    },
    plugins: [
        'react',
        'import',
        '@typescript-eslint',
    ],
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
                moduleDirectory: ['node_modules', './src/'],
                alias: {
                    '#components': './src/components',
                },
            },
        },
        react: {
            version: 'detect',
        },
    },
    rules: {
        strict: 0,
        indent: ['error', 4, { SwitchCase: 1 }],
        'react/jsx-indent': [2, 4],
        'react/jsx-indent-props': [2, 4],

        'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'import/extensions': ['off', 'never'],

        'react/require-default-props': ['warn', { ignoreFunctionalComponents: true }],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    },
};
