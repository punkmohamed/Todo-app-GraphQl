import userModel from "../../models/user.js"

export const userQueries = {
    async getUsers() {
        try {
            const users = await userModel.find()
            return users
        } catch (err) {
            throw new Error(err.message)
        }
    },
    async getSpecificUser(_, { id }) {
        try {
            const users = await userModel.findById(id)
            return users
        } catch (err) {
            throw new Error(err.message)
        }
    }

}