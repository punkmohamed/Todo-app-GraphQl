import todoModel from "../../models/todo.js"

export const todoQueries = {
    async getTodos() {
        try {
            const todos = await todoModel.find()
            return todos
        } catch (err) {
            throw new Error(err.message)
        }
    },
    async getATodo(_, { id }) {
        try {
            const todo = await todoModel.findById(id)
            return todo
        } catch (err) {
            throw new Error(err.message)
        }
    },

}
