const packageJson = require('./package.json');

const devDependencies = Object.keys(packageJson.devDependencies || {});

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'eslint-plugin-prettier'],
  extends: [
    'get-off-my-lawn',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': 'warn',
    'sort-keys': 'off',
    'import/order': 'off', // we use prettier for that
    'unicorn/filename-case': [
      'error',
      {
        cases: {
          kebabCase: true,
          camelCase: true,
          pascalCase: true,
        },
      },
    ],
    'node/no-unpublished-import': [
      'error',
      {
        allowModules: devDependencies,
      },
    ],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    '@typescript-eslint/no-unused-vars': [
      'error',
      { ignoreRestSiblings: true },
    ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
  },
  overrides: [
    {
      files: '*.js',
      rules: {
        'import/extensions': [
          'error',
          {
            json: 'ignorePackages',
          },
        ],
        '@typescript-eslint/no-var-requires': 'off', // js files must be able to require('')
        '@typescript-eslint/explicit-member-accessibility': 'off', // js files can't declare accessibility modifiers
      },
    },
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
