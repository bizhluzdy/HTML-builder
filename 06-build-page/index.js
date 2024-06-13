const fs = require('fs');
const path = require('path');
const dist = path.join(__dirname, 'project-dist');
const stylesDir = path.join(__dirname, 'styles');
const outputFile = path.join(dist, 'style.css');
const src = path.join(__dirname, 'assets');
const distr = path.join(__dirname, 'project-dist/assets');
let contents = '';

function createDistDirectory() {
  fs.access(dist, fs.constants.F_OK, (error) => {
    fs.rm(dist, { recursive: true }, (error) => {
      fs.mkdir(dist, (error) => {
        createFiles();
        copy(src, distr);
      });
    });
  });
}

fs.readdir(stylesDir, (err, files) => {
  files = files.filter(file => path.extname(file) === '.css');
  let count = 0;
  files.forEach(file => {
    fs.readFile(path.join(stylesDir, file), 'utf8', (err, data) => {
      contents += data + '\n';
      count++;
      if (count === files.length) {
        fs.writeFile(outputFile, contents, 'utf8', err => { });
      }
    });
  });
});

function createFiles() {
  const templatePath = path.join(__dirname, 'template.html');

  fs.readFile(templatePath, 'utf8', (err, templateContent) => {
    const componentTags = templateContent.match(/{{(.+?)}}/g) || [];
    let numProcessed = 0;
    componentTags.forEach((componentTag) => {
      const componentName = componentTag.slice(2, -2).trim();
      const componentPath = path.join(path.join(__dirname, 'components'), `${componentName}.html`);
      fs.readFile(componentPath, 'utf8', (err, componentContent) => {
        templateContent = templateContent.replace(componentTag, componentContent);
        numProcessed++;
        if (numProcessed === componentTags.length) {
          fs.writeFile(path.join(dist, 'index.html'), templateContent, (error) => { });
        }
      });
    });
  });
  fs.writeFile(path.join(dist, 'style.css'), contents, (error) => {
  });
}

function copy(src, distr) {
  fs.mkdir(distr, { recursive: true }, (err) => {
    fs.readdir(src, { withFileTypes: true }, (err, files) => {
      files.forEach((file) => {
        if (file.isDirectory()) {
          copy(path.join(src, file.name), path.join(distr, file.name));
        } else {
          fs.readFile(path.join(src, file.name), (err, data) => {
            fs.writeFile(path.join(distr, file.name), data, (err) => {
            });
          });
        }
      });
    });
  });
}

createDistDirectory();
