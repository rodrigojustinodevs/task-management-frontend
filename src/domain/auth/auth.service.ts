import { LoginDTO } from "./auth.dto";

export interface AuthServiceInterface {
    login(data: LoginDTO): Promise<{ token: string }>
    logout(): void
}