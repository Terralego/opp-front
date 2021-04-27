const error = 'error';
const warn = 'warn';
const off = 'off';
const always = 'always';

module.exports = {
  root: true,
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
  },
  extends: ['makina', 'prettier'],
  // Custom rules
  rules: {
    'operator-linebreak': [off],
    'no-unused-vars': [warn],
    'react/destructuring-assignment': [error],
    'react/no-this-in-sfc': [error],
    'react/jsx-wrap-multilines': [off],
    'react/no-access-state-in-setstate': [error],
  },
  parser: 'babel-eslint',
};
