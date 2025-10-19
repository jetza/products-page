import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import fs from "fs";
import path from "path";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    const after =
      (req.url?.split("/collections/")[1] || "").split("?")[0] || "";
    let relPath = decodeURIComponent(after).replace(/^\/+|\/+$/g, "");

    const baseDir = path.join(process.cwd(), "public", "collections");
    const fullPath = path.join(baseDir, relPath);

    if (!fullPath.startsWith(baseDir)) {
      return res.status(400).json({ message: "Invalid path" });
    }

    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ message: "File not found" });
    }

    const ext = path.extname(fullPath).toLowerCase();
    const contentType =
      ext === ".png"
        ? "image/png"
        : ext === ".jpg" || ext === ".jpeg"
          ? "image/jpeg"
          : ext === ".webp"
            ? "image/webp"
            : "application/octet-stream";

    const fileBuffer = fs.readFileSync(fullPath);
    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Length", fileBuffer.length);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    return res.send(fileBuffer);
  } catch (error: any) {
    return res
      .status(500)
      .json({
        message: "Error serving file",
        error: String(error?.message || error),
      });
  }
}
