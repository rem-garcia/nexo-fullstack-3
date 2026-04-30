import type { AuthResponse, LoginCredentials, RegisterCredentials, Profile } from './auth.types';
export declare class AuthService {
    static register(credentials: RegisterCredentials): Promise<AuthResponse>;
    static login(credentials: LoginCredentials): Promise<AuthResponse>;
    static logout(): Promise<{
        error: string | null;
    }>;
    static getUser(): Promise<Profile | null>;
    static getRole(): Promise<string | null>;
}
//# sourceMappingURL=auth.service.d.ts.map