import fs from "fs";
import path from "path";
import { Request } from "express";
import { fileURLToPath } from "url";

// ✅ Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Uploads file from req.file to /uploads/{folder}/filename
export function uploadFile(req: Request, folder: string): string | null {
  if (!req.file) return null;

  const uploadsDir = path.join(__dirname, "../uploads", folder);
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const fileName = `${Date.now()}-${req.file.originalname}`;
  const filePath = path.join(uploadsDir, fileName);

  fs.writeFileSync(filePath, req.file.buffer);

  // Return full URL path to access from client
  return `${req.protocol}://${req.get("host")}/uploads/${folder}/${fileName}`;
}

// Delete a file by its URL
export function deleteFile(fileUrl: string): void {
  const fileName = fileUrl.split("/").pop();
  if (!fileName) return;

  // Match folder name from URL if needed, here assuming inside /uploads/
  const folderMatch = fileUrl.match(/\/uploads\/([^/]+)\//);
  const folder = folderMatch ? folderMatch[1] : "";

  const filePath = path.join(__dirname, "../uploads", folder, fileName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log("✅ File deleted:", filePath);
  } else {
    console.warn("⚠️ File not found to delete:", filePath);
  }
}
