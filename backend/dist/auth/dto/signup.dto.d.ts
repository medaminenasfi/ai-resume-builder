import { RoleEnum } from '../../users/enums/role.enum';
export declare class SignupDto {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    role?: RoleEnum;
}
