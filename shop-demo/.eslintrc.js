module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'quotes': [1, 'single'],
    'semi': [1, 'never'],
    'array-bracket-newline': [2, 'consistent'],
    'comma-dangle': [1, 'never'],
    'eqeqeq': [1, 'always'],
    'no-var': 1,
    'prefer-const': [1, {
      'destructuring': 'any',
      'ignoreReadBeforeAssign': false
    }],
    'eol-last': [1, 'always']
  }
}
