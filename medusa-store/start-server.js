#!/usr/bin/env node
/**
 * Custom entry point for starting Medusa v2 server in production
 * This file calls the start command from @medusajs/medusa
 */


const path = require("path");
const express = require("express");

// Change working directory to the script's directory (where medusa-store files are)
const scriptDir = __dirname;
process.chdir(scriptDir);

// Serve static files from /public/products and /public/collections
const app = express();
// Serve /products/image.png
app.use("/products", express.static(path.join(scriptDir, "public", "products")));
// Serve /collections/image.png
app.use("/collections", express.static(path.join(scriptDir, "public", "collections")));
// Serve /public/collections/image.png (for direct static access)
app.use("/public/collections", express.static(path.join(scriptDir, "public", "collections")));

// Load the start command from Medusa v2
const startCommand = require("@medusajs/medusa/commands/start").default;

// The directory should point to .medusa/server where the built config is
const directory = path.join(scriptDir, ".medusa", "server");

// Get port from environment or default to 9000
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 9000;
const host = process.env.HOST || "0.0.0.0";

console.log(`Working directory: ${process.cwd()}`);
console.log(`Starting Medusa server from directory: ${directory}`);
console.log(`Server will listen on ${host}:${port}`);

// Start the Medusa server
startCommand({
  directory,
  port,
  host,
  types: false, // Don't generate types in production
  expressApp: app, // Pass the express app with static serving
}).catch((error) => {
  console.error("Failed to start Medusa server:", error);
  process.exit(1);
});
