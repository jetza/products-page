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
        express.static(publicPath, {
          maxAge: "1y",
          immutable: true,
        }),
      ],
    },
    {
      matcher: "/collections/*",
      middlewares: [
        express.static(publicPath, {
          maxAge: "1y",
          immutable: true,
        }),
      ],
    },
  ],
});
