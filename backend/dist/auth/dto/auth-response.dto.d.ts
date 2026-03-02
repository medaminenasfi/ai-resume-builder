export declare class AuthResponseDto {
    success: boolean;
    message: string;
    data?: any;
    error?: string;
}
export declare class SignupResponseDto extends AuthResponseDto {
    data: {
        user: {
            id: string;
            email: string;
            firstName?: string;
            lastName?: string;
            role: string;
            status: string;
            emailVerified: boolean;
            createdAt: string;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    };
}
export declare class LoginResponseDto extends AuthResponseDto {
    data: {
        user: {
            id: string;
            email: string;
            firstName?: string;
            lastName?: string;
            role: string;
            lastLoginAt?: string;
        };
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    };
}
export declare class ErrorResponseDto extends AuthResponseDto {
    success: false;
    error: string;
    statusCode: number;
}
