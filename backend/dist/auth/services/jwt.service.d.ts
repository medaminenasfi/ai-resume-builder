import { JwtService as NestJwtService } from '@nestjs/jwt';
import { TokenPair } from '../interfaces/token-pair.interface';
export declare class JwtService {
    private readonly jwtService;
    constructor(jwtService: NestJwtService);
    generateTokenPair(payload: any): TokenPair;
    verifyToken(token: string): any;
    generateAccessToken(payload: any): string;
    generateRefreshToken(payload: any): string;
}
