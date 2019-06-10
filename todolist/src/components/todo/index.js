import React, { Component } from 'react';
import { List, Icon } from 'antd';
import './index.css'


class ToDo extends Component {
  constructor(props) {
    super(props);
    this.handleonClick = this.handleonClick.bind(this);
  }

  handleonClick(e) {
    const todoid = this.props.todo.id;
    this.props.onFinishTack(todoid);
  }

  render() {
    const classNames = ({
      finished: this.props.todo.has_finished,
      todos: true
    });
    return (
      <List.Item actions={[<Icon type="delete" theme="outlined" />]}>
        <List.Item.Meta
          className={classNames}
          onClick={this.handleonClick}
          title={this.props.todo.category}
          description={this.props.todo.title}
        />
        {/* <span></span>
        <span className="category">{this.props.todo.category} </span> */}
      </List.Item>
    )
  }
}

export default ToDo;
