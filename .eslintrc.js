const error = 'error';
const warn = 'warn';
const off = 'off';
const always = 'always';

module.exports = {
  root: true,
  extends: ['makina', 'prettier'],
  // Custom rules
  rules: {
    'operator-linebreak': [off],
    'react/destructuring-assignment': [error],
    'react/no-this-in-sfc': [error],
    'react/jsx-wrap-multilines': [off],
    'react/no-access-state-in-setstate': [error],
  },
};
