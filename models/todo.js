import mongoose from 'mongoose';


const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: false,
        default: 'to-do',
        enum: ["to-do", "inProgress", "Done"]
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
})

const todoModel = mongoose.model('Todos', todoSchema)

export default todoModel