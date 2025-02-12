import { TaskStatus } from "./task-status.enum"

export interface ListTaskDTO {
    title?: string
}

export interface CreateTaskDTO {
    title: string
    description: string
}

export interface UpdateTaskDTO {
    title: string
    description: string
    status: TaskStatus
}