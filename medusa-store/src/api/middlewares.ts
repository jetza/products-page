import { defineMiddlewares } from "@medusajs/medusa";
import { Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";

// Custom middleware to serve static images
const serveStaticImages = (req: Request, res: Response, next: NextFunction) => {
  // Use originalUrl which contains the full path
  const urlPath = req.originalUrl || req.url || req.path;
  
  // Only handle image file requests under /products/ or /collections/
  const match = urlPath.match(/^\/(products|collections)\/(.+\.(png|jpg|jpeg|webp|gif))(\?.*)?$/i);
  
  if (!match) {
    return next();
  }

  const [, folder, filename] = match;
  const filePath = path.join(process.cwd(), "public", folder, path.basename(filename));

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    return next();
  }

  // Determine content type
  const ext = path.extname(filePath).toLowerCase();
  const contentType = ext === ".png" ? "image/png"
    : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg"
    : ext === ".webp" ? "image/webp"
    : ext === ".gif" ? "image/gif"
    : "application/octet-stream";

  // Set headers and send file
  res.setHeader("Content-Type", contentType);
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  return res.sendFile(filePath);
};

export default defineMiddlewares({
  routes: [
    {
      matcher: "/*",
      middlewares: [serveStaticImages],
    },
  ],
});
