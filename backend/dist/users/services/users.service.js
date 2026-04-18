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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../models/user.entity");
const role_enum_1 = require("../enums/role.enum");
const status_enum_1 = require("../enums/status.enum");
const bcrypt_service_1 = require("../../auth/services/bcrypt.service");
let UsersService = class UsersService {
    constructor(userRepository, bcryptService) {
        this.userRepository = userRepository;
        this.bcryptService = bcryptService;
    }
    async create(signupDto) {
        const existingUser = await this.userRepository.findOne({
            where: { email: signupDto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const hashedPassword = await this.bcryptService.hashPassword(signupDto.password);
        const user = this.userRepository.create({
            ...signupDto,
            passwordHash: hashedPassword,
            role: signupDto.role || role_enum_1.RoleEnum.USER,
            status: status_enum_1.StatusEnum.PENDING,
        });
        return this.userRepository.save(user);
    }
    async findByEmail(email) {
        return this.userRepository.findOne({
            where: { email },
        });
    }
    async findById(id) {
        return this.userRepository.findOne({
            where: { id },
        });
    }
    async findAll() {
        return this.userRepository.find({
            where: { deletedAt: null },
            select: ['id', 'email', 'firstName', 'lastName', 'phone', 'role', 'status', 'emailVerified', 'oauthProvider', 'createdAt', 'lastLoginAt', 'updatedAt'],
        });
    }
    async update(id, updateUserDto) {
        const user = await this.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (updateUserDto.password) {
            updateUserDto.password = await this.bcryptService.hashPassword(updateUserDto.password);
        }
        Object.assign(user, updateUserDto);
        return this.userRepository.save(user);
    }
    async updateLastLogin(id) {
        await this.userRepository.update(id, { lastLoginAt: new Date() });
    }
    async softDelete(id) {
        const user = await this.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.userRepository.softDelete(id);
    }
    async remove(id) {
        const user = await this.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.userRepository.remove(user);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        bcrypt_service_1.BcryptService])
], UsersService);
//# sourceMappingURL=users.service.js.map