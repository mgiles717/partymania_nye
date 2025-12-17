/** 
 * 
 *  Handles user assignment from a provided connection.
 * 
 *  A user is a logical representation of a connection. 
 *  This abstracts user logic from how a raw connection is handled.
 * 
 *  For example, a user should be able to choose a role and a name.
 * 
 */
import type { Role } from "../roles/roles.js"
import { Player, Host, Observer } from "../roles/index.js"
import { type Socket } from "socket.io";

export class User {
    userId: string;
    role: Role;
    username: string;
    socket: Socket;
    teamName: string | null;

    constructor(
        userId: string,
        socket: Socket,
        role: Role = new Player(),
        username: string = "",
    ) {
        this.userId = userId;
        this.role = role;
        this.username = username; 
        this.socket = socket;
        this.teamName = null;
    }

    // Role
    getRole(){
        return this.role.getRoleType();
    }

    setRole(role: Role){
        this.role = role
    }

    // Username
    getUsername(){
        return this.username;
    }

    setUsername(username: string){
        this.username = username;
    }
    
    // Socket
    getSocket(){
        return this.socket;
    }

    setSocket(socket: Socket){
        this.socket = socket;
    }

    // Team
    getTeamName(){
        return this.teamName
    }


    setTeamName(teamName: string | null){
        this.teamName = teamName
    }
}
