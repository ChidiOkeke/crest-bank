import { UserRoles } from "../types/index.types";

import { RBAC } from "rbac";

const rbacConfig = {
    roles: Object.values(UserRoles), // [CUSTOMER, BANKER, ADMIN]
    permissions: {
        ACCOUNT: ["CREATE", "SUSPEND", "REINSTATE"],
        BALANCE: ["VIEW"],
        HISTORY: ["VIEW"],
        TRANSFER: ["INITIATE"]
    },
    grants: {
        CUSTOMER: ['CREATE_ACCOUNT', 'INITIATE_TRANSFER','VIEW_BALANCE', 'VIEW_HISTORY'],
        BANKER: ['VIEW_BALANCE', 'VIEW_HISTORY', 'SUSPEND_ACCOUNT', 'REINSTATE_ACCOUNT'],
        ADMIN: ['BANKER'],
    },
}
export const rbac = new RBAC(rbacConfig);






