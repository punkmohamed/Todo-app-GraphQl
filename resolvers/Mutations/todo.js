import userModel from "../../models/user.js"
import todoModel from "../../models/todo.js"

export const TodoMutaions = {
    async addTodo(_, { todo: { title, status } }, context) {
        try {
            const user = await userModel.findById(context.id)
            if (!user) {
                throw new Error("user does not exist")
            }
            const newTodo = await todoModel.insertMany({ title, status, userId: context.id })
            return newTodo
        } catch (error) {
            throw new Error("creating todo  failed")
        }
    },
    async updateTodo(_, { id, todo }, context) {
        try {
            const user = await userModel.findById(context.id)
            if (!user) {
                throw new Error("user does not exist")
            }
            const updatedTodo = await todoModel.findByIdAndUpdate(id, todo, { new: true })
            return updatedTodo
        } catch (error) {
            throw new Error("updating todo  failed")
        }
    },
    async deleteTodo(_, { id }, context) {
        try {
            const user = await userModel.findById(context.id)
            if (!user) {
                throw new Error("user does not exist")
            }
            const deletedTodo = await todoModel.findByIdAndDelete(id)
            return deletedTodo
        } catch (error) {
            throw new Error("deleting todo  failed")
        }
    }
}