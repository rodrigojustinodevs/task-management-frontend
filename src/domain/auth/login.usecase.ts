import { CookiesServiceInterface } from "@domain/cookies/cookies.service";
import { LoginDTO } from "./auth.dto";
import { AuthServiceInterface } from "./auth.service";

export function loginUseCase({
    cookies,
    service
}: {
    cookies: CookiesServiceInterface
    service: AuthServiceInterface,
}) {
    return {
        execute: async function ({ email, password }: LoginDTO) {
            const { data } = await service.login({
                email, password
            });
            console.log(data);
            
            cookies.set("accessToken", data.token, {
                expires: new Date().setHours(3),
                secure: true,
            })
        }
    }
}