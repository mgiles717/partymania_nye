// server/sockets/connection.ts
import { v4 as uuidv4 } from "uuid";
import { type Socket } from "socket.io";
import { User } from "../user/user.js";

// Testing
import { Team } from "../teams/teams.js";

import { Logger } from "tslog";
import { createTeam, getTeamFromTeamName } from "../teams/teamManager.js";

const log = new Logger();

// In-memory player store: playerId -> { socket }
export const users: Record<string, User> = {};

// For us to send the relevant pages to the appropriate roles, 
// we need to be able to broadcast/push events to the group of users
// under that role.

// Key: Socket ID, Val: UUID
// I don't think this is needed
// export const userSocketMap: Record<string, string> = {};

/**
 * Handle a new Socket.IO connection
 * @param socket Socket.IO socket instance
 */
export function handleConnection(socket: Socket) {
  // Retrieve playerId from handshake (sent from client cookie) or generate new
  const userId = socket.handshake.auth?.playerId || uuidv4();

  function getOrCreateCurrentUser(userId: string, socket: Socket): User{
    // Don't actually need the userId as a parameter,
    // as this can be retrieved from the socket, but for
    // simplicity sake I have kept it there.

    let currentUser = users[userId]
    // Create a new User object for the uuid if it does not exist
    // and store in users
    if (!currentUser) {
      log.debug("Creating new user");
      currentUser = new User(userId, socket);
      users[userId] = currentUser;
    }
    // Need to set user socket on each reconnection
    // to assure we send to correct socket
    else {
      currentUser.setSocket(socket);
    }
    return currentUser
  }

  // Try to fetch current user
  let currentUser = getOrCreateCurrentUser(userId, socket)

  // Create and set team
  // createTeam("TestTeam");
  // let testTeam = getTeamFromTeamName("TestTeam"); 
  // 
  // testTeam?.addUserToTeam(currentUser)
  // log.info(currentUser.getTeamName())
  // 

  log.info("Player connected:", userId, "(socket:", socket.id, ")");
  log.info("User Role:", users[userId]?.getRole());
  log.info("Username:", users[userId]?.getUsername());
  log.info("Total players:", Object.keys(users).length);

  // Notify this player
  socket.emit("welcome", { message: `Hello player ${userId}` });

  // Broadcast to all other players
  socket.broadcast.emit("playerJoined", { userId });

  // Handle disconnection
  socket.on("disconnect", () => {
    log.info("Player disconnected:", userId);
    // delete users[playerId];
    socket.broadcast.emit("playerLeft", { userId });
    // console.log("Total players:", Object.keys(users).length);
  });

  socket.on("changeName", (data: any) => {
    console.log("Received name:", data.text, userId)
    if(users[userId]){
      users[userId].setUsername(data.text); 
    }
  });
}
