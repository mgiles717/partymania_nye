import { io, type Socket } from "socket.io-client";
import { getOrCreateUserId } from "./user";

interface ServerToClientEvents {
  welcome: { message: string };
}

interface ClientToServerEvents {
  join: { playerId: string };
}

const playerId = getOrCreateUserId();

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io("192.168.1.71:3000", {
    auth: { playerId }, // send it in the handshake
  });

socket.on("connect", () => {
  console.log("Connected! Socket ID:", socket.id, "Player ID:", playerId);
});
