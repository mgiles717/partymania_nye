// server/sockets/connection.ts
import { v4 as uuidv4 } from "uuid";
import { User } from "../user/user.js";

// In-memory player store: playerId -> { socket }
export const users: Record<string, { user: User }> = {};

/**
 * Handle a new Socket.IO connection
 * @param socket Socket.IO socket instance
 */
export function handleConnection(socket: any) {
  // Retrieve playerId from handshake (sent from client cookie) or generate new
  const playerId = socket.handshake.auth?.playerId || uuidv4();

  // Try to fetch current user
  let current_user = users[playerId]
  // Create a new User object for the uuid if it does not exist
  // and store in users
  if (!current_user) {
    console.log("Creating new user");
    current_user = { user: new User() };
    users[playerId] = current_user;
  }

  console.log("Player connected:", playerId, "(socket:", socket.id, ")");
  console.log("Total players:", Object.keys(users).length);
  console.log("User Role:", users[playerId]?.user.getRole());
  console.log("Username:", users[playerId]?.user.getUsername());

  // Notify this player
  socket.emit("welcome", { message: `Hello player ${playerId}` });

  // Broadcast to all other players
  socket.broadcast.emit("playerJoined", { playerId });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Player disconnected:", playerId);
    // delete users[playerId];
    socket.broadcast.emit("playerLeft", { playerId });
    // console.log("Total players:", Object.keys(users).length);
  });

  socket.on("changeName", (data: any) => {
    console.log("Received name:", data.text, playerId)
    if(users[playerId]?.user){
      users[playerId].user.setUsername(data.text); 
    }
  });

}
