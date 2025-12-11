const { v4: uuidv4 } = require("uuid");
const { createTeam, addPlayerToTeam, removePlayerFromTeam, getTeam, teams } = require("../game/teams")

// In-memory player store: playerId -> { socket }
const players: Record<string, { socket: any }> = {};

/**
 * Handle a new Socket.IO connection
 * @param socket Socket.IO socket instance
 */
function handleConnection(socket: any) {
  // Retrieve playerId from handshake (sent from client cookie) or generate new
  const playerId = socket.handshake.auth?.playerId || uuidv4();
  players[playerId] = { socket };

  console.log("Player connected:", playerId, "(socket:", socket.id, ")");
  console.log("Total players:", Object.keys(players).length);

  // Notify this player
  socket.emit("welcome", { message: `Hello player ${playerId}` });

  // Broadcast to all other players
  socket.broadcast.emit("playerJoined", { playerId });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Player disconnected:", playerId);
    delete players[playerId];
    socket.broadcast.emit("playerLeft", { playerId });
    console.log("Total players:", Object.keys(players).length);
  });
}

module.exports = { handleConnection, players };
