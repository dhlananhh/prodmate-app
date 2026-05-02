import fs from "fs";
import path from "path";

// Đường dẫn nguồn và đích
const srcDir = path.join(__dirname, "../config/keys");
const destDir = path.join(__dirname, "../../dist/config/keys");

// Tạo thư mục đích nếu chưa có
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy tất cả file .pem từ src sang dist
fs.readdirSync(srcDir).forEach(file => {
  if (file.endsWith(".pem")) {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);
    fs.copyFileSync(srcFile, destFile);
    console.log(`✅ Copied ${file} to dist/config/keys`);
  }
});
