module.exports = {
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  importOrder: [
    '^react$', // react on top
    '^(?!\\.|@/).+', // externals, not @/*
    '^@/',
    '^\\.{1,2}/.+',
  ],
  importOrderSeparation: false,
};
