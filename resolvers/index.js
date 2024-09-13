
import { todoQueries } from './Queries/todo.js';
import { userQueries } from './Queries/user.js';
import { UserMutaions } from './Mutations/user.js';
import { TodoMutaions } from './Mutations/todo.js';
export const resolvers = {

    Query: {
        ...userQueries,
        ...todoQueries
    },
    Mutation: {
        ...UserMutaions,
        ...TodoMutaions
    }
}