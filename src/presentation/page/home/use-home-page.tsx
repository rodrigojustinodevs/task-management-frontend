import { ListTaskDTO } from "@domain/task/task.dto"
import { Task } from "@domain/task/task.entity"
import { useDebounce } from "@presentation/hooks/use-debounce"
import { usePagination } from "@presentation/hooks/use-pagination"
import { useToast } from "@presentation/hooks/use-toast"
import { taskService } from "@services/taskService"
import { useCallback, useEffect, useState } from "react"
import { useForm, useWatch } from "react-hook-form"

export function useHomePage() {

    const [tasks, setTasks] = useState<Task[]>([])

    const [loading, setLaoding] = useState<boolean>(false)

    const { toast } = useToast()

    const { control, register, getValues } = useForm({
        defaultValues: {
            title: undefined,
        }
    })

    const {
        currentPage,
        totalPages,
        rowsPerPage,
        rowsPerPageOptions,
        changePerPage,
    } = usePagination()

    const searchText = useWatch({
        control,
        name: "title",
        defaultValue: "", // Adicionando um valor padrão
    })

    const searchTitle = useDebounce(searchText ?? "")


    const getTasks = useCallback(async (params: ListTaskDTO) => {
        return await taskService.getTasks(params.title)
    }, [])

    const showRequestErrorMessage = useCallback(() => {
        toast({
            variant: "destructive",
            title: "Error",
            description: "It was not possible to search"
        })
    }, [])

    const handleChangePerPage = useCallback(async (value: string) => {
        setLaoding(true)
        changePerPage(value)
        try {
            const params = getValues()
            const { data } = await getTasks(params)
            setTasks(data)
        } catch (error) {
            console.log(error);
            showRequestErrorMessage()
        }

        setLaoding(false)
    }, [currentPage])

    const getTasksByFilters = useCallback(async () => {
        setLaoding(true)
        try {
            const params = getValues()
            const { data } = await getTasks(params)
            setTasks(data)
        } catch (error) {
            console.log(error);
            
            showRequestErrorMessage()
        }
        setLaoding(false)
    }, [rowsPerPage, currentPage])

    useEffect(() => {
        if(searchText !== undefined) {
            getTasksByFilters()
        }
    }, [searchTitle])

    useEffect(() => {
        getTasksByFilters()
    }, [])


    return {
        loading,
        tasks,
        currentPage,
        totalPages,
        rowsPerPage,
        rowsPerPageOptions,
        register,
        handleChangePerPage,
        getTasksByFilters
    }
}