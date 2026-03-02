import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { SignupDto } from '../../auth/dto/signup.dto';
import { BcryptService } from '../../auth/services/bcrypt.service';
export declare class UsersService {
    private readonly userRepository;
    private readonly bcryptService;
    constructor(userRepository: Repository<User>, bcryptService: BcryptService);
    create(signupDto: SignupDto): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(id: string, updateUserDto: Partial<SignupDto>): Promise<User>;
    updateLastLogin(id: string): Promise<void>;
    softDelete(id: string): Promise<void>;
    remove(id: string): Promise<void>;
}
