export interface Entitlement {
    resource: string;
    actions: string[];
}
export interface UserEntitlements {
    userId: string;
    role: string;
    permissions: Entitlement[];
}
