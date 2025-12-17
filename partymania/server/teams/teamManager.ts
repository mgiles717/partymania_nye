import { Team } from "./teams.js";

export const teams: Record<string, Team> = {};

export function createTeam(name: string): void{
    if (teams[name]) {
        throw new Error(`Team ${name} already exists`)        
    }

    const team = new Team(name);
    teams[name] = team;
}

export function getTeamFromTeamName(teamName: string): Team | null{
    if(teams[teamName]){
        return teams[teamName];
    }
    return null;
}

export function dropTeamFromTeams(teamName: string): void{
    if(teams[teamName]){
        delete teams[teamName];
    }
}