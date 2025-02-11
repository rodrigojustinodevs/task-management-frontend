import { LoginDTO } from "@domain/auth/auth.dto";
import { AuthServiceInterface } from "@domain/auth/auth.service";
import { CookiesServiceInterface } from "@domain/cookies/cookies.service";
import { AxiosInstance } from "axios";

export const authService = ({
    cookies,
    client,
}: {
    cookies?: CookiesServiceInterface;
    client: AxiosInstance
}): AuthServiceInterface => {

    return {
        login: async (data: LoginDTO): Promise<{ token: string }> => {
            return await client.post("/api/login", data)
        },
        logout: () => {
            cookies?.remove("accessToken");
        }
    }
}