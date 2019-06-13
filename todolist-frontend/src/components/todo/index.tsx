import React from 'react';
import { List } from 'antd';
import "./index.css";
import { Mutation } from 'react-apollo';
import { UPDATE_TODO, GET_TODOS, DELETE_TODO } from '../../api/gqls'

export interface Props {
  todo: { title: string, category: { name: string }, todo_id: number, is_finished: boolean },
}

class Todo extends React.Component<Props, object> {
  render() {
    const { todo } = this.props;

    return (
      <List.Item>
        <p style={{ textAlign: "center", width: "100%", padding: "0 20%" }} className={` ${todo.is_finished ? "finished" : "not-finished"} `}>
          <span style={{ position: "absolute", left: "40px", paddingRight: "20px", fontWeight: "bold" }}>{todo.category.name}</span>

          <Mutation
            mutation={UPDATE_TODO}
            update={(cache: any, { data: { changeTodo } }) => {
              const { todos } = cache.readQuery({ query: GET_TODOS })
              const newTodos = todos.map((todo) => {
                if (todo.todo_id === changeTodo.todo_id) {
                  todo.is_finished = changeTodo.is_finished;
                }
                return todo
              })
              cache.writeQuery({
                query: GET_TODOS,
                data: { todos: newTodos },
              });
            }}
          >
            {
              updateTodo => (
                <span onClick={e => {
                  updateTodo({ variables: { todo_id: todo.todo_id } })
                }} style={{ cursor: "pointer" }}>{todo.title}</span>
              )
            }
          </Mutation>
          <Mutation
            mutation={DELETE_TODO}
            update={(cache: any, { data: { deleteTodo } }) => {
              const { todos } = cache.readQuery({ query: GET_TODOS })
              const newTodos = todos.filter(todo => todo.todo_id!==deleteTodo.todo_id);
              cache.writeQuery({
                query: GET_TODOS,
                data: { todos: newTodos },
              });
            }}
          >
            {
              deleteTodo => (
                <span onClick={e => {
                  deleteTodo({ variables: { todo_id: todo.todo_id } })
                }} style={{ position: "absolute", right: "40px", color: "red", cursor: "pointer" }}>X</span>
              )
            }
          </Mutation>

          
        </p>
      </List.Item>
    )
  }
}

export default Todo;
