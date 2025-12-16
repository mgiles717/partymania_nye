import { Role, RoleType } from "./roles.js"

export class Player extends Role {
    getRoleType() {
        return RoleType.Player as const;
    }
}