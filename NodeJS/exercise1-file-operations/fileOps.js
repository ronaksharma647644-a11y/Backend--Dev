const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'input.txt');
const outputPath = path.join(__dirname, 'wordCount.txt');

fs.readFile(inputPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file');
        return;
    }

    const words = data.trim().split(/\s+/).length;
    const result = `Total Words: ${words}`;

    fs.writeFile(outputPath, result, (err) => {
        if (err) {
            console.error('Error writing file');
            return;
        }
        console.log('Word count written successfully');
    });
});
