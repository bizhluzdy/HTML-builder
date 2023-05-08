const fs = require('fs');
const path = require('path');
const stylesDir = path.join(__dirname, 'styles');
const distDir = path.join(__dirname, 'project-dist');
const outputFile = path.join(distDir, 'bundle.css');

fs.readdir(stylesDir, (err, files) => {
  files = files.filter(file => path.extname(file) === '.css');
  let contents = '';
  let count = 0;
  files.forEach(file => {
    fs.readFile(path.join(stylesDir, file), 'utf8', (err, data) => {
      contents += data + '\n';
      count++;
      if (count === files.length) {
        fs.writeFile(outputFile, contents, 'utf8', err => {});
      }
    });
  });
});
