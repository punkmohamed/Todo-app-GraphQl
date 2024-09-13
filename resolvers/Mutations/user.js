import userModel from './../../models/user.js';
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const UserMutaions = {

  async register(_, { user }) {
    console.log({ ...user });

    try {
      const registerUser = await userModel.create({ ...user })
      return registerUser

    } catch (err) {
      throw new Error("registerati failed")
    }
  },


  async login(_, { user: { email, password } }) {

    if (!email || !password) {
      throw new Error("You must provide a valid email and password")
    }

    const user = await userModel.findOne({ email })
    if (!user) {
      throw new Error("invalid email or password")
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)


    if (!isPasswordCorrect) {
      throw new Error("invalid email or password")

    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.SECRET)

    return { user, token }


  },
  async deleteUser(_, { id }, context) {

    console.log(context);

    if (!context.role || context.role != "admin") {
      throw new Error("you're not authenticted")
    } else {
      try {
        const user = await userModel.findById(id)
        if (!user) {
          throw new Error("cannot delete , user Not found")
        }

        await userModel.findByIdAndDelete(id)

        return "User Deleted Successfully"
      } catch (err) {
        throw new Error(err.message)

      }
    }
  },
  async updateUser(_, { user }, context) {

    console.log(context);
    try {
      const user = await userModel.findById(id)
      if (!user) {
        throw new Error("cannot updated , user Not found")
      }

      const updatedUser = await userModel.findByIdAndUpdate(id, user, { new: true })

      return updatedUser
    } catch (err) {
      throw new Error(err.message)

    }
  }
}
