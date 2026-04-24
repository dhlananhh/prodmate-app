import fs from "fs";
import path from "path";

// Directory where logs are stored
const logDir = path.join(__dirname, "../../logs");

// Number of days to keep logs
const MAX_DAYS = 14;

// Maximum file size in bytes (20 MB)
const MAX_SIZE = 20 * 1024 * 1024;

function cleanupLogs() {
  const now = Date.now();

  fs.readdir(logDir, (err, files) => {
    if (err) {
      console.error("Failed to read logs directory:", err);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(logDir, file);

      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error("Failed to read file stats:", filePath, err);
          return;
        }

        const ageInDays = (now - stats.mtime.getTime()) / (1000 * 60 * 60 * 24);
        const sizeInMB = stats.size / (1024 * 1024);

        // Delete if older than MAX_DAYS or larger than MAX_SIZE
        if (ageInDays > MAX_DAYS || stats.size > MAX_SIZE) {
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Failed to delete file:", filePath, err);
            } else {
              console.log(
                `Deleted log file: ${filePath} (Age: ${ageInDays.toFixed(
                  1
                )} days, Size: ${sizeInMB.toFixed(2)} MB)`
              );
            }
          });
        }
      });
    });
  });
}

cleanupLogs();
