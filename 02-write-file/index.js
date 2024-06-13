const fs = require('fs');
const path = require('path');
const readline = require('readline');

const writeStream = fs.createWriteStream(path.join(__dirname, 'file.txt'), { flags: 'a' });

process.stdout.write('Введите текст или нажмите CTRL + C для выхода: ');

const lineWrite = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

lineWrite.on('line', (input) => {
  if (input === 'exit') {
    console.log('Всего хорошего!');
    process.exit();
  } else {
    writeStream.write(`${input}\n`);
    process.stdout.write('Введите текст или нажмите CTRL + C для выхода: ');
  }
});
lineWrite.on('SIGINT', () => {
  console.log('Всего хорошего!');
  process.exit();
});
  