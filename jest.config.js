/** @type {import('@ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '@Basis-Theory/basis-theory-js':
      '<rootDir>/node_modules/@Basis-Theory/basis-theory-js/index.js',
  },
};
