// server/index.ts
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import { handleConnection } from "./sockets/connection.js"; // Note .js extension for Node ESM

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } // allow frontend connections
});

// Pass each new socket to handleConnection
io.on("connection", handleConnection);

server.listen(3000, "0.0.0.0", () => {
  console.log("Server running on http://localhost:3000");
});

module.exports = { io };
