import { Repository } from 'typeorm';
import { User } from '../models/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    update(id: string, updateUserDto: Partial<CreateUserDto>): Promise<User>;
    remove(id: string): Promise<void>;
}
