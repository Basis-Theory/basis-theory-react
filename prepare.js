const fs = require('fs');
const libPackage = require('./package.json');

// remove not required fields
delete libPackage.devDependencies;

// use only required temporary script in dist
libPackage.scripts = {
  postversion: 'cd .. && node bump.js',
};

// include all 'dist/*' files
libPackage.files = ['*'];

// updates source flags removing 'dist' path
['main', 'module', 'typings'].forEach((prop) => {
  libPackage[prop] = libPackage[prop].replace('dist/', '');
});

fs.mkdirSync('./dist', { recursive: true });
fs.writeFileSync(
  './dist/package.json',
  JSON.stringify(libPackage, undefined, 2)
);
