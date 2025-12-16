import { Role, RoleType } from "./roles.js"

export class Host extends Role {
    getRoleType() {
        return RoleType.Player as const;
    }

}