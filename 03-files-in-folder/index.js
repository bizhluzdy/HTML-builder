const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), (err, files) => {
  files.forEach((file) => {
    const filePath = path.join(path.join(__dirname, 'secret-folder'), file);
    fs.stat(filePath, (err, stats) => {
      if (stats.isDirectory()) {
        return;
      }
      console.log(`${path.parse(file).name} - ${path.extname(filePath).slice(1)} - ${(stats.size / 1024).toFixed(3)}kb`);
    });
  });
});