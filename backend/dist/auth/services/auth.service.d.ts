import { UsersService } from '../../users/services/users.service';
import { JwtService } from './jwt.service';
import { BcryptService } from './bcrypt.service';
import { LoginDto } from '../dto/login.dto';
import { SignupDto } from '../dto/signup.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { User } from '../../users/models/user.entity';
import { TokenPair } from '../interfaces/token-pair.interface';
import { UserEntitlements } from '../interfaces/entitlement.interface';
export declare class AuthService {
    private usersService;
    private jwtService;
    private bcryptService;
    constructor(usersService: UsersService, jwtService: JwtService, bcryptService: BcryptService);
    signup(signupDto: SignupDto): Promise<TokenPair>;
    login(loginDto: LoginDto): Promise<TokenPair>;
    refresh(refreshTokenDto: RefreshTokenDto): Promise<TokenPair>;
    logout(userId: string): Promise<void>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void>;
    validateUser(email: string, password: string): Promise<User | null>;
    getEntitlements(userId: string): Promise<UserEntitlements>;
    private getPermissionsByRole;
    hashPwd(password: string): Promise<string>;
    comparePwd(password: string, hash: string): Promise<boolean>;
}
