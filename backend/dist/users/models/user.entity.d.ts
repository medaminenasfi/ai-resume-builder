import { RoleEnum } from '../enums/role.enum';
import { StatusEnum } from '../enums/status.enum';
export declare class User {
    id: string;
    email: string;
    passwordHash: string;
    role: RoleEnum;
    status: StatusEnum;
    emailVerified: boolean;
    oauthProvider: string;
    firstName: string;
    lastName: string;
    phone?: string;
    createdAt: Date;
    lastLoginAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    updateTimestamp(): void;
    login(password: string): boolean;
    logout(): void;
    resetPassword(token: string, password: string): void;
    getEntitlements(): any[];
    softDelete(): void;
}
