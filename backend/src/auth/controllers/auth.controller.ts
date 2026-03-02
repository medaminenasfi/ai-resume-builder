import { Controller, Post, Body, UseGuards, Request, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { SignupDto } from '../dto/signup.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { TokenPairDto } from '../dto/token-pair.dto';
import { UserEntitlementsDto } from '../dto/user-entitlements.dto';
import { SignupResponseDto, LoginResponseDto, ErrorResponseDto } from '../dto/auth-response.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully', type: SignupResponseDto })
  @ApiResponse({ status: 409, description: 'User with this email already exists', type: ErrorResponseDto })
  async signup(@Body() signupDto: SignupDto, @Res() res: Response): Promise<void> {
    try {
      const tokens = await this.authService.signup(signupDto);
      
      const response: SignupResponseDto = {
        success: true,
        message: 'User registered successfully',
        data: {
          user: {
            id: 'user-id', // This would come from the actual user object
            email: signupDto.email,
            firstName: signupDto.firstName,
            lastName: signupDto.lastName,
            role: signupDto.role || 'user',
            status: 'active',
            emailVerified: false,
            createdAt: new Date().toISOString(),
          },
          tokens: {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          },
        },
      };
      
      res.status(HttpStatus.CREATED).json(response);
    } catch (error) {
      const errorResponse: ErrorResponseDto = {
        success: false,
        message: 'Registration failed',
        error: error.message,
        statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      };
      
      res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Login successful', type: LoginResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials', type: ErrorResponseDto })
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<void> {
    try {
      const tokens = await this.authService.login(loginDto);
      
      const response: LoginResponseDto = {
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: 'user-id', // This would come from the actual user object
            email: loginDto.email,
            firstName: 'John', // This would come from the actual user object
            lastName: 'Doe',   // This would come from the actual user object
            role: 'user',
            lastLoginAt: new Date().toISOString(),
          },
          tokens: {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
          },
        },
      };
      
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      const errorResponse: ErrorResponseDto = {
        success: false,
        message: 'Login failed',
        error: error.message,
        statusCode: error.status || HttpStatus.UNAUTHORIZED,
      };
      
      res.status(error.status || HttpStatus.UNAUTHORIZED).json(errorResponse);
    }
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiResponse({ status: 200, description: 'Token refreshed successfully', type: TokenPairDto })
  @ApiResponse({ status: 401, description: 'Invalid refresh token', type: ErrorResponseDto })
  async refresh(@Body() refreshTokenDto: RefreshTokenDto, @Res() res: Response): Promise<void> {
    try {
      const tokens = await this.authService.refresh(refreshTokenDto);
      
      const response = {
        success: true,
        message: 'Token refreshed successfully',
        data: tokens,
      };
      
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      const errorResponse: ErrorResponseDto = {
        success: false,
        message: 'Token refresh failed',
        error: error.message,
        statusCode: error.status || HttpStatus.UNAUTHORIZED,
      };
      
      res.status(error.status || HttpStatus.UNAUTHORIZED).json(errorResponse);
    }
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'Logout successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: ErrorResponseDto })
  async logout(@Request() req, @Res() res: Response): Promise<void> {
    try {
      await this.authService.logout(req.user.sub);
      
      const response = {
        success: true,
        message: 'Logout successful',
      };
      
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      const errorResponse: ErrorResponseDto = {
        success: false,
        message: 'Logout failed',
        error: error.message,
        statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      };
      
      res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Request password reset' })
  @ApiResponse({ status: 200, description: 'Password reset email sent' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto, @Res() res: Response): Promise<void> {
    try {
      await this.authService.forgotPassword(forgotPasswordDto);
      
      const response = {
        success: true,
        message: 'Password reset instructions sent to your email',
      };
      
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      const errorResponse: ErrorResponseDto = {
        success: false,
        message: 'Failed to send password reset',
        error: error.message,
        statusCode: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      };
      
      res.status(error.status || HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
    }
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reset password with token' })
  @ApiResponse({ status: 200, description: 'Password reset successful' })
  @ApiResponse({ status: 400, description: 'Invalid or expired reset token', type: ErrorResponseDto })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto, @Res() res: Response): Promise<void> {
    try {
      await this.authService.resetPassword(resetPasswordDto);
      
      const response = {
        success: true,
        message: 'Password reset successful',
      };
      
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      const errorResponse: ErrorResponseDto = {
        success: false,
        message: 'Password reset failed',
        error: error.message,
        statusCode: error.status || HttpStatus.BAD_REQUEST,
      };
      
      res.status(error.status || HttpStatus.BAD_REQUEST).json(errorResponse);
    }
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({ status: 200, description: 'Profile retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: ErrorResponseDto })
  getProfile(@Request() req, @Res() res: Response) {
    const response = {
      success: true,
      message: 'Profile retrieved successfully',
      data: req.user,
    };
    
    res.status(HttpStatus.OK).json(response);
  }

  @Get('entitlements')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user entitlements and permissions' })
  @ApiResponse({ status: 200, description: 'Entitlements retrieved successfully', type: UserEntitlementsDto })
  @ApiResponse({ status: 401, description: 'Unauthorized', type: ErrorResponseDto })
  async getEntitlements(@Request() req, @Res() res: Response): Promise<void> {
    try {
      const entitlements = await this.authService.getEntitlements(req.user.sub);
      
      const response = {
        success: true,
        message: 'Entitlements retrieved successfully',
        data: entitlements,
      };
      
      res.status(HttpStatus.OK).json(response);
    } catch (error) {
      const errorResponse: ErrorResponseDto = {
        success: false,
        message: 'Failed to retrieve entitlements',
        error: error.message,
        statusCode: error.status || HttpStatus.UNAUTHORIZED,
      };
      
      res.status(error.status || HttpStatus.UNAUTHORIZED).json(errorResponse);
    }
  }
}
