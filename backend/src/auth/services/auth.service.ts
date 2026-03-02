import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
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

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
  ) {}

  async signup(signupDto: SignupDto): Promise<TokenPair> {
    const user = await this.usersService.create(signupDto);
    
    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role 
    };
    
    return this.jwtService.generateTokenPair(payload);
  }

  async login(loginDto: LoginDto): Promise<TokenPair> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Status check removed - any user can login regardless of status
    // if (user.status !== 'active') {
    //   throw new UnauthorizedException(`Account is ${user.status}. Please contact support or verify your email.`);
    // }

    // Update last login
    await this.usersService.updateLastLogin(user.id);

    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role 
    };
    
    return this.jwtService.generateTokenPair(payload);
  }

  async refresh(refreshTokenDto: RefreshTokenDto): Promise<TokenPair> {
    try {
      const payload = this.jwtService.verifyToken(refreshTokenDto.refreshToken);
      
      const user = await this.usersService.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const newPayload = { 
        sub: user.id, 
        email: user.email, 
        role: user.role 
      };
      
      return this.jwtService.generateTokenPair(newPayload);
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string): Promise<void> {
    // In a real implementation, you might want to invalidate the token
    // For now, we'll just update the user's last logout time
    // Note: We need to fix this as lastLoginAt doesn't exist in the update DTO
    // await this.usersService.update(userId, { lastLoginAt: null });
    console.log(`User ${userId} logged out`);
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const user = await this.usersService.findByEmail(forgotPasswordDto.email);
    
    if (!user) {
      // Don't reveal if email exists or not
      return;
    }

    // In a real implementation, you would send an email with a reset token
    // For now, we'll just log it
    console.log(`Password reset requested for: ${user.email}`);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    try {
      const payload = this.jwtService.verifyToken(resetPasswordDto.token);
      
      const user = await this.usersService.findById(payload.sub);
      if (!user) {
        throw new BadRequestException('Invalid reset token');
      }

      const hashedPassword = await this.bcryptService.hashPassword(resetPasswordDto.newPassword);
      await this.usersService.update(user.id, { password: hashedPassword });
    } catch (error) {
      throw new BadRequestException('Invalid or expired reset token');
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && await this.bcryptService.comparePassword(password, user.passwordHash)) {
      return user;
    }
    return null;
  }

  async getEntitlements(userId: string): Promise<UserEntitlements> {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const permissions = this.getPermissionsByRole(user.role);

    return {
      userId: user.id,
      role: user.role,
      permissions,
    };
  }

  private getPermissionsByRole(role: string): any[] {
    switch (role) {
      case 'admin':
        return [
          { resource: 'users', actions: ['create', 'read', 'update', 'delete'] },
          { resource: 'content', actions: ['create', 'read', 'update', 'delete'] },
          { resource: 'settings', actions: ['read', 'update'] },
        ];
      case 'moderator':
        return [
          { resource: 'users', actions: ['read', 'update'] },
          { resource: 'content', actions: ['create', 'read', 'update', 'delete'] },
        ];
      case 'user':
      default:
        return [
          { resource: 'profile', actions: ['read', 'update'] },
          { resource: 'content', actions: ['create', 'read'] },
        ];
    }
  }

  // Utility methods
  async hashPwd(password: string): Promise<string> {
    return this.bcryptService.hashPassword(password);
  }

  async comparePwd(password: string, hash: string): Promise<boolean> {
    return this.bcryptService.comparePassword(password, hash);
  }
}
