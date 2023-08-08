import { UserRoles } from "../types/index.types";

const { RBAC } = require("rbac");

export const rbac = new RBAC({
    roles: Object.values(UserRoles), // [CUSTOMER, BANKER, ADMIN]
    permissions: {
        ACCOUNT: ["SUSPEND", "REINSTATE"],
        BALANCE: ["VIEW"],
        HISTORY: ["VIEW"],
        TRANSFER: ["INITIATE"]
    },
    grants: {
        CUSTOMER: ['INITTATE_TRANSFER','VIEW_BALANCE', 'VIEW_HISTORY'],
        BANKER: ['VIEW_BALANCE', 'VIEW_HISTORY', 'SUSPEND_ACCOUNT', 'REINSTATE_ACCOUNT'],
        ADMIN: ['BANKER'],
    },
});