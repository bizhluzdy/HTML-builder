const fs = require('fs');
const path = require('path');
const src = path.join(__dirname, 'files');
const dist = path.join(__dirname, 'files-copy');

function copyDir(src, dist) {
  fs.access(dist, (err) => {
    if (!err) {
      fs.rm(dist, { recursive: true }, (err) => {
        copy(src, dist);
      });
    } else {
      copy(src, dist);
    }
  });
  function copy(src, dist) {
    fs.mkdir(dist, { recursive: true }, (err) => {
      fs.readdir(src, { withFileTypes: true }, (err, files) => {
        files.forEach((file) => {
          if (file.isDirectory()) {
            copyDir(path.join(src, file.name), path.join(dist, file.name));
          } else {
            fs.readFile(path.join(src, file.name), (err, data) => {
              fs.writeFile(path.join(dist, file.name), data, (err) => {
              });
            });
          }
        });
      });
    });
  }
}

copyDir(src, dist);
