export const schema = `#graphql


type User  {
    _id:ID
    name:String!
    age:String
    email:String!
    role:String
}
input register{
    name:String!
    email:String!
    password:String!
    age:Int
}
input update{
    name:String
    email:String
}

input login{
    email:String!
    password:String!
}



type LoginResponse{
    token:String
}
type Todo{
    _id:ID
    title:String
    status:S
}
type Query{
    getSpecificUser(id:String):User
    getUsers:[User]
    getTodos:[Todo]
    getATodo(id:String):Todo
}
type Mutation{
    register(user:register):User
    login(user:login):LoginResponse
    deleteUser(id:ID):User
    updateUser(user:update):User
    addTodo(todo:todo):Todo
    updateTodo(todo:todo):Todo
    deleteTodo(id:ID):Todo
}



input todo{
    title:String!
    status:S
}


enum S{
    todo
    inProgress
    Done
}
`