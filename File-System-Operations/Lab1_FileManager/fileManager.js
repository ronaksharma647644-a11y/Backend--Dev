
const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function menu() {
  console.log("\n--- File Manager ---");
  console.log("1. Read File");
  console.log("2. Write File");
  console.log("3. Copy File");
  console.log("4. Delete File");
  console.log("5. List Directory");
  console.log("6. Exit");

  rl.question("Choose option: ", choice => {
    switch (choice) {
      case "1": readFile(); break;
      case "2": writeFile(); break;
      case "3": copyFile(); break;
      case "4": deleteFile(); break;
      case "5": listDirectory(); break;
      case "6": rl.close(); break;
      default: menu();
    }
  });
}

function readFile() {
  rl.question("Enter file path: ", filePath => {
    fs.createReadStream(filePath, "utf8")
      .on("data", chunk => console.log(chunk))
      .on("error", err => console.log(err.message))
      .on("end", menu);
  });
}

function writeFile() {
  rl.question("Enter file path: ", filePath => {
    rl.question("Enter text: ", text => {
      fs.appendFile(filePath, text + "\n", () => menu());
    });
  });
}

function copyFile() {
  rl.question("Source file: ", src => {
    rl.question("Destination file: ", dest => {
      fs.copyFile(src, dest, () => menu());
    });
  });
}

function deleteFile() {
  rl.question("Enter file path: ", filePath => {
    fs.unlink(filePath, () => menu());
  });
}

function listDirectory() {
  rl.question("Directory path: ", dirPath => {
    fs.readdir(dirPath, (err, files) => {
      if (!err) files.forEach(f => console.log(f));
      menu();
    });
  });
}

menu();
