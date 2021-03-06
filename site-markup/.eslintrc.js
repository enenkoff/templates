module.exports = {
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    extends: ['airbnb-base'],
    plugins: ['babel', 'import', 'prettier'],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
    },
    rules: {
        indent: ['error', 4],
        'linebreak-style': 'off',
        'global-require': 'off',
        'one-var': ['error', { var:'consecutive', let:'consecutive', const:'never' }],
        'arrow-parens': 'off',
        'object-curly-newline': 'off',
        'no-mixed-operators': 'off',
        'arrow-body-style': 'off',
        'function-paren-newline': 'off',
        'no-plusplus': 'off',
        'space-before-function-paren': 0,
        'max-len': ['error', 100, 2, { ignoreUrls: true }],
        'no-console': 'error',
        'no-alert': 'error',
        'no-param-reassign': 'off',
        radix: 'off',
        'prefer-destructuring': 'off',
        'prettier/prettier': ['error'],
    },
};
/* rules: https://eslint.org/docs/rules/ */
