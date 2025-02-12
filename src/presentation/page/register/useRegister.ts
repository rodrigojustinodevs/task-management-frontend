import { RegisterValidationSchema } from "@domain/auth/auth.validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@presentation/hooks/use-toast";
import { useCallback } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { userService } from '@services/userService';

type Form = z.infer<typeof RegisterValidationSchema>
export function useRegister() {
    const navigate = useNavigate()
    const { toast } = useToast()

    const { formState:{ errors, isSubmitting }, register, handleSubmit } = useForm<Form>({
        resolver: zodResolver(RegisterValidationSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const handleRegister: SubmitHandler<Form> = useCallback(async (data: Form) => {

        try {
            await userService.createUser(data.name, data.email, data.password);

            toast({
                variant: "success",
                title: "Success",
                description: "User registration successful",
            })
            
            navigate("/auth/login", { replace: true }) 
        } catch (error) {
            console.log(error);
            
            toast({
                variant: "destructive",
                title: "Error",
                description: "There was an error registering the user",
            })
        }
    }, [])

    return {
        errors,
        isSubmitting,
        register,
        handleSubmit,
        handleRegister
    }
}