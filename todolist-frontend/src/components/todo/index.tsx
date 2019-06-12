import React from 'react';
import { List } from 'antd';
import "./index.css";
import { Mutation } from 'react-apollo';
import { UPDATE_TODO, GET_TODOS } from '../../api/gqls'

export interface Props {
  todo: { title: string, category: { name: string }, todo_id: number, is_finished: boolean },
}

class Todo extends React.Component<Props, object> {
  render() {
    const { todo } = this.props;

    return (
      <Mutation
        mutation={UPDATE_TODO}
        update={(cache: any, { data: {changeTodo} }  ) => {
          const { todos } = cache.readQuery({ query: GET_TODOS })
          
          cache.writeQuery({
            query: GET_TODOS,
            data: { todos: todos.map((todo) => {
              if(todo.todo_id == changeTodo.todo_id ) {
                todo = changeTodo;
              }
            }) },
          });
        }}
        // key={id}
      >
        {
          updateTodo => (
            <List.Item>
              <p style={{ textAlign: "center", width: "100%", padding: "0 20%" }} className={` ${todo.is_finished ? "finished" : "not-finished"} `}>
                <span style={{ position: "absolute", left: "40px", paddingRight: "20px", fontWeight: "bold" }}>{todo.category.name}</span>
                <span onClick={e => {
                  // console.log("test");
                  // e.preventDefault();
                  // console.log(todo.todo_id)
                  updateTodo({ variables: { todo_id: todo.todo_id  } })
                }}>{todo.title}</span>
                <span style={{ position: "absolute", right: "40px", color: "red" }}>X</span>
              </p>
            </List.Item>
          )
        }

      </Mutation>


    )
  }
}

export default Todo;
