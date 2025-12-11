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

const teams: Record<string, string[]> = {};

function createTeam(teamId: string, playerId: string) {
    if (!teams[teamId]) {
        teams[teamId] = [];
    }
    addPlayerToTeam(playerId, teamId)
    return teamId;
}

function addPlayerToTeam(playerId: string, teamId: string){
    removePlayerFromTeam(playerId);
    if (!teams[teamId]) teams[teamId] = [];
    teams[teamId].push(playerId);
}

function removePlayerFromTeam(playerId: string) {
    for (const t in teams) {
        if (!teams[t]) continue;
        teams[t] = teams[t].filter(id => id !== playerId)
    }
}

function getTeam(playerId: string){
    for (const t in teams) {
        if (teams[t]?.includes(playerId)) return t;
    }
    return null;
}

module.exports = { teams, 
    createTeam,
    addPlayerToTeam,
    removePlayerFromTeam,
    getTeam
};