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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../../users/services/users.service");
const jwt_service_1 = require("./jwt.service");
const bcrypt_service_1 = require("./bcrypt.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, bcryptService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.bcryptService = bcryptService;
    }
    async signup(signupDto) {
        const user = await this.usersService.create(signupDto);
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role
        };
        return this.jwtService.generateTokenPair(payload);
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        await this.usersService.updateLastLogin(user.id);
        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role
        };
        return this.jwtService.generateTokenPair(payload);
    }
    async refresh(refreshTokenDto) {
        try {
            const payload = this.jwtService.verifyToken(refreshTokenDto.refreshToken);
            const user = await this.usersService.findById(payload.sub);
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            const newPayload = {
                sub: user.id,
                email: user.email,
                role: user.role
            };
            return this.jwtService.generateTokenPair(newPayload);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async logout(userId) {
        console.log(`User ${userId} logged out`);
    }
    async forgotPassword(forgotPasswordDto) {
        const user = await this.usersService.findByEmail(forgotPasswordDto.email);
        if (!user) {
            return;
        }
        console.log(`Password reset requested for: ${user.email}`);
    }
    async resetPassword(resetPasswordDto) {
        try {
            const payload = this.jwtService.verifyToken(resetPasswordDto.token);
            const user = await this.usersService.findById(payload.sub);
            if (!user) {
                throw new common_1.BadRequestException('Invalid reset token');
            }
            const hashedPassword = await this.bcryptService.hashPassword(resetPasswordDto.newPassword);
            await this.usersService.update(user.id, { password: hashedPassword });
        }
        catch (error) {
            throw new common_1.BadRequestException('Invalid or expired reset token');
        }
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (user && await this.bcryptService.comparePassword(password, user.passwordHash)) {
            return user;
        }
        return null;
    }
    async getEntitlements(userId) {
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const permissions = this.getPermissionsByRole(user.role);
        return {
            userId: user.id,
            role: user.role,
            permissions,
        };
    }
    getPermissionsByRole(role) {
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
    async hashPwd(password) {
        return this.bcryptService.hashPassword(password);
    }
    async comparePwd(password, hash) {
        return this.bcryptService.comparePassword(password, hash);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_service_1.JwtService,
        bcrypt_service_1.BcryptService])
], AuthService);
//# sourceMappingURL=auth.service.js.map