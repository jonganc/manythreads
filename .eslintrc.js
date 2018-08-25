const l_ = require('lodash');

const base = JSON.parse(
  JSON.stringify(require('eslint-config-airbnb-base/rules/style.js')),
);
const baseEs6 = JSON.parse(
  JSON.stringify(require('eslint-config-airbnb-base/rules/es6.js')),
);
const noUnderscoreDangle = base.rules['no-underscore-dangle'];
noUnderscoreDangle[1].allow.push('l_');

module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb',
  plugins: ['react'],
  globals: {
    graphql: false,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 9,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-underscore-dangle': noUnderscoreDangle,
    quotes: ['off'],
    'arrow-parens': ['error', 'as-needed'],
    'operator-linebreak': ['off'],
    'implicit-arrow-linebreak': ['off'],
    'prefer-template': ['off'],
    'react/jsx-filename-extension': ['off'],
    'react/prop-types': ['off'],
    'import/prefer-default-export': ['off'],
    'react/jsx-one-expression-per-line': ['off'],
  },
};

// (['no-else-return', 'no-multi-spaces',
//   'function-paren-newline', 'object-curly-newline',
//   'import/prefer-default-export', 'no-console', 'prefer-template',
//   'no-useless-return']
//  .map(key => module.exports.rules[key] = ['off']));
