import { defineMiddlewares } from "@medusajs/medusa";
import express from "express";
import path from "path";

// Serve static files from public directory
const publicPath = path.join(process.cwd(), "public");

export default defineMiddlewares({
  routes: [
    {
      matcher: "/products/*",
      middlewares: [
        (req, res, next) => {
          // Rewrite /products/image.jpg to /public/products/image.jpg
          req.url = req.url.replace(/^\/products/, "/products");
          express.static(publicPath, {
            maxAge: "1y",
            immutable: true,
          })(req, res, next);
        },
      ],
    },
    {
      matcher: "/collections/*",
      middlewares: [
        (req, res, next) => {
          // Rewrite /collections/image.jpg to /public/collections/image.jpg
          req.url = req.url.replace(/^\/collections/, "/collections");
          express.static(publicPath, {
            maxAge: "1y",
            immutable: true,
          })(req, res, next);
        },
      ],
    },
  ],
});
