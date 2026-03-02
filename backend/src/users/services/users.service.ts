import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { SignupDto } from '../../auth/dto/signup.dto';
import { RoleEnum } from '../enums/role.enum';
import { StatusEnum } from '../enums/status.enum';
import { BcryptService } from '../../auth/services/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly bcryptService: BcryptService,
  ) {}

  async create(signupDto: SignupDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { email: signupDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await this.bcryptService.hashPassword(signupDto.password);

    const user = this.userRepository.create({
      ...signupDto,
      passwordHash: hashedPassword,
      role: signupDto.role || RoleEnum.USER,
      status: StatusEnum.PENDING, // Back to pending - status check removed from login
    });

    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      where: { deletedAt: null },
      select: ['id', 'email', 'firstName', 'lastName', 'phone', 'role', 'status', 'emailVerified', 'oauthProvider', 'createdAt', 'lastLoginAt', 'updatedAt'],
    });
  }

  async update(id: string, updateUserDto: Partial<SignupDto>): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.password) {
      updateUserDto.password = await this.bcryptService.hashPassword(updateUserDto.password);
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.userRepository.update(id, { lastLoginAt: new Date() });
  }

  async softDelete(id: string): Promise<void> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.softDelete(id);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
  }
}
