import { gql } from '@apollo/client';

export const TASK_CREATED_SUBSCRIPTION = gql`
  subscription OnTaskCreated {
    taskCreated {
      id
      name
      createdAt
      project {
        id
        name
      }
    }
  }
`; 