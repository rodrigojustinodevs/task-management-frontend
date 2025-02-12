import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks($title: String) {
    tasks(title: $title) {
      id
      title
      description
      status
    }
  }
`;