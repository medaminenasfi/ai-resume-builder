import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { SignupDto } from '../dto/signup.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(signupDto: SignupDto, res: Response): Promise<void>;
    login(loginDto: LoginDto, res: Response): Promise<void>;
    refresh(refreshTokenDto: RefreshTokenDto, res: Response): Promise<void>;
    logout(req: any, res: Response): Promise<void>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto, res: Response): Promise<void>;
    resetPassword(resetPasswordDto: ResetPasswordDto, res: Response): Promise<void>;
    getProfile(req: any, res: Response): void;
    getEntitlements(req: any, res: Response): Promise<void>;
}
