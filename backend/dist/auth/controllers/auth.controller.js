"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_service_1 = require("../services/auth.service");
const login_dto_1 = require("../dto/login.dto");
const signup_dto_1 = require("../dto/signup.dto");
const refresh_token_dto_1 = require("../dto/refresh-token.dto");
const forgot_password_dto_1 = require("../dto/forgot-password.dto");
const reset_password_dto_1 = require("../dto/reset-password.dto");
const token_pair_dto_1 = require("../dto/token-pair.dto");
const user_entitlements_dto_1 = require("../dto/user-entitlements.dto");
const auth_response_dto_1 = require("../dto/auth-response.dto");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signup(signupDto, res) {
        try {
            const tokens = await this.authService.signup(signupDto);
            const response = {
                success: true,
                message: 'User registered successfully',
                data: {
                    user: {
                        id: 'user-id',
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
            res.status(common_1.HttpStatus.CREATED).json(response);
        }
        catch (error) {
            const errorResponse = {
                success: false,
                message: 'Registration failed',
                error: error.message,
                statusCode: error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
            res.status(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
        }
    }
    async login(loginDto, res) {
        try {
            const tokens = await this.authService.login(loginDto);
            const response = {
                success: true,
                message: 'Login successful',
                data: {
                    user: {
                        id: 'user-id',
                        email: loginDto.email,
                        firstName: 'John',
                        lastName: 'Doe',
                        role: 'user',
                        lastLoginAt: new Date().toISOString(),
                    },
                    tokens: {
                        accessToken: tokens.accessToken,
                        refreshToken: tokens.refreshToken,
                    },
                },
            };
            res.status(common_1.HttpStatus.OK).json(response);
        }
        catch (error) {
            const errorResponse = {
                success: false,
                message: 'Login failed',
                error: error.message,
                statusCode: error.status || common_1.HttpStatus.UNAUTHORIZED,
            };
            res.status(error.status || common_1.HttpStatus.UNAUTHORIZED).json(errorResponse);
        }
    }
    async refresh(refreshTokenDto, res) {
        try {
            const tokens = await this.authService.refresh(refreshTokenDto);
            const response = {
                success: true,
                message: 'Token refreshed successfully',
                data: tokens,
            };
            res.status(common_1.HttpStatus.OK).json(response);
        }
        catch (error) {
            const errorResponse = {
                success: false,
                message: 'Token refresh failed',
                error: error.message,
                statusCode: error.status || common_1.HttpStatus.UNAUTHORIZED,
            };
            res.status(error.status || common_1.HttpStatus.UNAUTHORIZED).json(errorResponse);
        }
    }
    async logout(req, res) {
        try {
            await this.authService.logout(req.user.sub);
            const response = {
                success: true,
                message: 'Logout successful',
            };
            res.status(common_1.HttpStatus.OK).json(response);
        }
        catch (error) {
            const errorResponse = {
                success: false,
                message: 'Logout failed',
                error: error.message,
                statusCode: error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
            res.status(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
        }
    }
    async forgotPassword(forgotPasswordDto, res) {
        try {
            await this.authService.forgotPassword(forgotPasswordDto);
            const response = {
                success: true,
                message: 'Password reset instructions sent to your email',
            };
            res.status(common_1.HttpStatus.OK).json(response);
        }
        catch (error) {
            const errorResponse = {
                success: false,
                message: 'Failed to send password reset',
                error: error.message,
                statusCode: error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
            res.status(error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
        }
    }
    async resetPassword(resetPasswordDto, res) {
        try {
            await this.authService.resetPassword(resetPasswordDto);
            const response = {
                success: true,
                message: 'Password reset successful',
            };
            res.status(common_1.HttpStatus.OK).json(response);
        }
        catch (error) {
            const errorResponse = {
                success: false,
                message: 'Password reset failed',
                error: error.message,
                statusCode: error.status || common_1.HttpStatus.BAD_REQUEST,
            };
            res.status(error.status || common_1.HttpStatus.BAD_REQUEST).json(errorResponse);
        }
    }
    getProfile(req, res) {
        const response = {
            success: true,
            message: 'Profile retrieved successfully',
            data: req.user,
        };
        res.status(common_1.HttpStatus.OK).json(response);
    }
    async getEntitlements(req, res) {
        try {
            const entitlements = await this.authService.getEntitlements(req.user.sub);
            const response = {
                success: true,
                message: 'Entitlements retrieved successfully',
                data: entitlements,
            };
            res.status(common_1.HttpStatus.OK).json(response);
        }
        catch (error) {
            const errorResponse = {
                success: false,
                message: 'Failed to retrieve entitlements',
                error: error.message,
                statusCode: error.status || common_1.HttpStatus.UNAUTHORIZED,
            };
            res.status(error.status || common_1.HttpStatus.UNAUTHORIZED).json(errorResponse);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signup'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new user' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User registered successfully', type: auth_response_dto_1.SignupResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'User with this email already exists', type: auth_response_dto_1.ErrorResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_dto_1.SignupDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Login user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login successful', type: auth_response_dto_1.LoginResponseDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid credentials', type: auth_response_dto_1.ErrorResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Refresh access token' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Token refreshed successfully', type: token_pair_dto_1.TokenPairDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Invalid refresh token', type: auth_response_dto_1.ErrorResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Logout user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Logout successful' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized', type: auth_response_dto_1.ErrorResponseDto }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('forgot-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Request password reset' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password reset email sent' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.ForgotPasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('reset-password'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Reset password with token' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Password reset successful' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid or expired reset token', type: auth_response_dto_1.ErrorResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get user profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized', type: auth_response_dto_1.ErrorResponseDto }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Get)('entitlements'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get user entitlements and permissions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Entitlements retrieved successfully', type: user_entitlements_dto_1.UserEntitlementsDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized', type: auth_response_dto_1.ErrorResponseDto }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getEntitlements", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map