import { gql } from "@apollo/client";
import httpClient from "@infra/graphql/apolloClient";

import { User } from "@domain/entities/User";
import { UserRepository } from "@domain/repositories/UserRepository";

const GET_USERS = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

export class UserRepositoryImpl implements UserRepository {
  async createUsers(users: User[]): Promise<void> {
    // Lógica para criar os usuários
    console.log('Criando usuários:', users);
  }

  async getUsers(): Promise<User[]> {
    const { data } = await httpClient.query({ query: GET_USERS });
    return data.users;
  }
}
