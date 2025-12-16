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

export class User {
    role: Role;
    username: string;

    constructor(
        role: Role = new Player(),
        username: string = "",
    ) {
        this.role = role
        this.username= username; 
    }

    getRole(){
        return this.role.getRoleType();
    }

    setRole(role: Role){
        this.role = role
    }

    getUsername(){
        return this.username;
    }

    setUsername(username: string){
        this.username = username;
    }
    
}