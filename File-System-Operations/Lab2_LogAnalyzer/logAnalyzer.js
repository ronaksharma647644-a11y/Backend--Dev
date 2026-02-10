
const fs = require("fs");
const readline = require("readline");

let totalLines = 0;
let errorCount = 0;

const rl = readline.createInterface({
  input: fs.createReadStream("app.log"),
  crlfDelay: Infinity
});

rl.on("line", line => {
  totalLines++;
  if (line.includes("ERROR")) errorCount++;
});

rl.on("close", () => {
  console.log("Total Lines:", totalLines);
  console.log("Error Count:", errorCount);
});
