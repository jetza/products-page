#!/usr/bin/env node
/**
 * Custom entry point for starting Medusa v2 server in production
 * This file calls the start command from @medusajs/medusa
 */

const path = require("path");

// Change working directory to the script's directory (where medusa-store files are)
const scriptDir = __dirname;
process.chdir(scriptDir);

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

// Start the server
startCommand({
  directory,
  port,
  host,
  types: false, // Don't generate types in production
}).catch((error) => {
  console.error("Failed to start Medusa server:", error);
  process.exit(1);
});
