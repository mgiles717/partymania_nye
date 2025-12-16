/**
 * 
 *  Logic for handling different user roles.
 *  Roles will be split into three, for each kind of intended user:
 *  - Player: Main role that most users will inherit
 *  - Host: Administrative role to distribute points and handle game state, 
 *  removes as much dependency on the system as possible. This is a design choice,
 *  as I don't have much intention to do secure programming.
 *  - Observer: This will display the game state, which could possess the board or 
 *  the minigame present.
 *
 */

export enum RoleType{
    Player = "player",
    Host = "host",
    Observer = "observer"
}

export abstract class Role {
  abstract getRoleType(): RoleType;
}