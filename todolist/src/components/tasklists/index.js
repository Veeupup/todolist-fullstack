import React, { Component } from 'react';
import ToDo from '../todo'
import { List } from 'antd'


class TaskLists extends Component {
  constructor(props) {
    super(props);
    console.log(props.todos)
  }

  render() {
    const todos = this.props.todos;
    const lists = todos.map((todo) =>
      <ToDo
        onFinishTack={this.props.onFinishTask}
        key={todo.id}
        todo={todo}
      />)
    return (
      <div style={{ paddingTop: 30, textAlign: 'center',  }}>
        <List bordered style={{ width: 500, margin: '0 auto' }}>
          {lists}
        </List>
      </div>
    )

  }
}

export default TaskLists;
