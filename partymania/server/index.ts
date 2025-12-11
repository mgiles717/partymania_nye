const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const { handleConnection } = require("./sockets/connection");

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
