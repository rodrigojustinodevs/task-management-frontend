import client from '@infra/graphql/apolloClient';
import { CREATE_USER_MUTATION } from '@infra/graphql/mutations/createUser';
interface CreateUserResponse {
  createUser: {
    id: string;
    name: string;
    email: string;
  };
}

// Utilizando o gql para criar a mutação corretamente


export const userService = {
  createUser: async (name: string, email: string, password: string) => {
    try {
      await client.mutate<CreateUserResponse>({
        mutation: CREATE_USER_MUTATION,
        variables: { name, email, password },
        context: {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  },
};
