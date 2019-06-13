import { gql } from 'apollo-boost';

// 获取所有的todo
export const GET_TODOS = gql`
{
  todos {
    todo_id
    title
    is_finished
    category {
      cate_id
      name
    }
  }
}`;

// 根据类别获取 todo
export const GET_TODO_BYCATE = gql`
  query findTodo($cate_id: ID) {
    todos(cate_id: $cate_id) {
      todo_id
      title
      is_finished
      category {
        cate_id
        name
      }
    }
  }
`;

// 获取所有的类别
export const GET_CATEGORIES = gql`
{
categories {
  cate_id
  name
  description
  }
}
`;

// 增加 todo
export const ADD_TODO = gql`
  mutation addTodo($title: String!, $cate_id: Int!){
    createTodo(title: $title, cate_id: $cate_id) {
      todo_id
      title
      is_finished
      category {
        cate_id
        name
      }
    }
  }
`;

// 改变某一个 todo 的状态
export const UPDATE_TODO = gql`
  mutation UPDATE_TODO($todo_id: ID!){
  changeTodo(todo_id: $todo_id) {
    todo_id
    title
    is_finished
    category {
      name
    }
  }
}
`;

// 删除某个 Todo
export const DELETE_TODO = gql`
  mutation deleteTodo($todo_id: ID!) {
    deleteTodo(todo_id: $todo_id) {
      todo_id
      title
    }
  }
`

