import client from '@infra/graphql/apolloClient';
import { GET_TASKS } from '@infra/graphql/queries/getTasks';
import { CREATE_TASK, UPDATE_TASK, DELETE_TASK } from '@infra/graphql/mutations/taskMutations';
interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface GetTasksResponse {
  tasks: Task[];
}

export const taskService = {
    getTasks: async (title?: string): Promise<Task[]> => {
      try {
        const { data } = await client.query<GetTasksResponse>({
          query: GET_TASKS,
          variables: { title },
          fetchPolicy: 'network-only',
        });
  
        return data.tasks;
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
        throw error;
      }
    },
    createTask: async (title: string, description: string, status: string): Promise<Task> => {
      try {
        const { data } = await client.mutate({
          mutation: CREATE_TASK,
          variables: { title, description, status },
        });
  
        return data.createTask;
      } catch (error) {
        console.error('Erro ao criar tarefa:', error);
        throw error;
      }
    },
  
    updateTask: async (id: string, title?: string, description?: string, status?: string): Promise<Task> => {
      try {
        const { data } = await client.mutate({
          mutation: UPDATE_TASK,
          variables: { id, title, description, status },
        });
  
        return data.updateTask;
      } catch (error) {
        console.error('Erro ao atualizar tarefa:', error);
        throw error;
      }
    },
  
    deleteTask: async (id: string): Promise<string> => {
      try {
        const { data } = await client.mutate({
          mutation: DELETE_TASK,
          variables: { id },
        });
  
        return data.deleteTask.id;
      } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
        throw error;
      }
    },
  };
  