import { Role, RoleType } from "./roles.js"

export class Observer extends Role {
    getRoleType() {
        return RoleType.Observer as const;
    }

}