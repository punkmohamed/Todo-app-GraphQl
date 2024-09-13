import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["admin", "user"]

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
})

userSchema.pre('save', async function (next) {

    const hashedPassword = await bcrypt.hash(this.password, 12)

    this.password = hashedPassword

    next()

})
const userModel = mongoose.model('User', userSchema)

export default userModel