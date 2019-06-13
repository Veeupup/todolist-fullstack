import { gql } from "apollo-server"

export const typeDefs = gql`
  type Query {
    todos(cate_id: ID): [Todo]
    todo(id: ID!): Todo
    categories: [Category]
    category(id: ID!): Category
  }

  type Todo {
    todo_id: ID!
    title: String
    is_finished: Boolean
    category: Category
  }

  type Category {
    cate_id: ID!
    name: String
    description: String
  }

  type Mutation {
    createTodo(title: String, cate_id: Int): Todo
    deleteTodo(todo_id: ID): Todo
    changeTodo(todo_id: ID): Todo
    updateTodo(todo_id: Int, title: String, cate_id: Int): Todo
    createCategory(name: String, description: String): Category
    deleteCategory(cate_id: Int): Category
    updateCategory(cate_id: Int, name: String, description: String): Category
  }

`;

