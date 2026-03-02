export declare class EntitlementDto {
    resource: string;
    actions: string[];
}
export declare class UserEntitlementsDto {
    userId: string;
    role: string;
    permissions: EntitlementDto[];
}
