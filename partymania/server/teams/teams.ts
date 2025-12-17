/**
 * 
 *  All team based server side functionality handled here.
 * 
 *  A player may only be apart of one team, and if they create that team, they 
 *  will join it automatically. 
 * 
 *  Joining a team will automatically leave any existing team.
 * 
 */
import { User } from "../user/user.js";

export class Team {
    name: string;
    points: number;
    users: Record<string, User>;

    constructor(
        name: string,
    ) {
        this.name = name;
        this.points = 0;
        this.users = {};
    }

    addUserToTeam(user: User): void{
        if (!this.users[user.userId]){
            this.users[user.userId] = user;
        }
        user.setTeamName(this.name) 
    }

    removeUserFromTeam(user: User): void{
        let userId = user.userId

        if (this.users[userId]){
            delete this.users[userId];
            user.setTeamName(null);
        }
    }
}