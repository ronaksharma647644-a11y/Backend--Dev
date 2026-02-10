
const fs = require("fs");
const path = require("path");

const sourceDir = "source";
const targetDir = "target";

function syncDir(src, dest) {
  try {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    fs.readdirSync(src).forEach(item => {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);

      if (fs.statSync(srcPath).isDirectory()) {
        syncDir(srcPath, destPath);
      } else {
        fs.copyFileSync(srcPath, destPath);
      }
    });
  } catch (err) {
    console.log("Error syncing:", err.message);
  }
}

syncDir(sourceDir, targetDir);
console.log("Synchronization completed.");
