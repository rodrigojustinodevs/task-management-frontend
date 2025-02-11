import { useToast } from "@presentation/hooks/use-toast";
import { LoginValidationSchema } from "@domain/auth/auth.validations";
import { useCallback } from "react";
import { cookiesService } from "@infra/cookies/cookies.service";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { loginUseCase } from "@domain/auth/login.usecase";
import { z } from "zod";
import { authService } from "@services/authService";
import { httpClient } from "@infra/http-client";



type Form = z.infer<typeof LoginValidationSchema>
export function useLogin() {
    const navigate = useNavigate()
    const { toast } = useToast()

    const { formState:{ errors, isSubmitting }, register, handleSubmit } = useForm<Form>({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const handleLogin: SubmitHandler<Form> = useCallback(async (data: Form) => {
        const cookies = cookiesService()
        const service = authService({
            client: httpClient
        })
        try {
            await loginUseCase({
                cookies,
                service
            }).execute(data)


            toast({
                variant: "success",
                title: "Success",
                description: "Login successful",
            })
            
            navigate("/home", { replace: true })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "There was an error logging in",
            });
            console.error(error);
        }
    }, [])

    return {
        errors,
        isSubmitting,
        register,
        handleSubmit,
        handleLogin
    }
}