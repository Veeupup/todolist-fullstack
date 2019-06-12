import React from 'react';
import { List } from 'antd';
import Todo from '../todo';

export interface Props {
  todos: { title: string, category: { name: string }, todo_id: number, is_finished: boolean }[]
  name: String
}



class TodoList extends React.Component<Props, object>  {

  render() {
    const { todos } = this.props;

    return (
      <div>
        <List
          size="large"
          dataSource={todos}
          bordered
          renderItem={
            item => (
              <Todo todo={item}/>
            )
          }
        />
      </div>
    )
  }

}

export default TodoList;
