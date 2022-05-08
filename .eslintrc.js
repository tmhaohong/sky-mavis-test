module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
    createClass: 'createReactClass',
    pragma: 'React',
    flowVersion: '0.53',
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'google'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/prop-types': [0],
    'require-jsdoc': [0],
    'react/display-name': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    indent: ['error', 2],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-multi-spaces': ['error'],
    'max-len': [
      'error',
      {
        code: 120,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-unused-vars': [
      'error',
      {
        vars: 'local',
        args: 'all',
      },
    ],
    'quote-props': ['error', 'as-needed'],
    'linebreak-style': [0],
  },
};
