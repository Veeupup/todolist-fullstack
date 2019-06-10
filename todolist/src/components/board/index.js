import React, { Component } from 'react';
import TaskInput from '../taskinput';
import TaskLists from '../tasklists';
import { Select, Row } from 'antd';

const { Option } = Select;

let alltodos = [
  { title: 'do homework', id: 1, has_finished: false, category: 'job' },
  { title: 'learn react', id: 2, has_finished: false, category: 'job' },
  { title: 'it is ok', id: 8, has_finished: true, category: 'job' },
  { title: 'learn react', id: 3, has_finished: true, category: 'life' },
  { title: 'do it!', id: 4, has_finished: true, category: 'life' },
  { title: 'do it!', id: 5, has_finished: true, category: 'twdaily' },
]

let allcategories = [
  { id: 1, name: 'job' },
  { id: 2, name: 'life' },
  { id: 3, name: 'twdaily' },
]

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: alltodos,
      categories: allcategories,
      inputText: 'nothing ......',
      inputCategory: 'job',
      currentCategory: 'all',
      currentChoosen: 'all',
    }

    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.handleInputCategory = this.handleInputCategory.bind(this);

    this.handleFinishTask = this.handleFinishTask.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);

    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeState = this.handleChangeState.bind(this);

    this.handleFilterTasks = this.handleFilterTasks.bind(this);
  }


  handleInputSubmit(inputText) {
    // 本地先操作，增加
    const inputCategory = this.state.inputCategory;
    const todos = [{
      title: inputText,
      id: this.state.todos.length + 1,
      has_finished: false,
      category: inputCategory
    }, ...this.state.todos
    ];
    this.setState({
      inputText: inputText,
      todos: todos
    })

    // 异步操作，去向服务器发起请求
    alltodos = todos;
  }

  handleInputCategory(category) {
    this.setState({
      inputCategory: category
    })
  }


  handleFilterTasks() {
    const choosenState = this.state.currentChoosen;
    const category = this.state.currentCategory;
    let filterdToDoLists;
    if (choosenState === 'all') {
      if (category === 'all') {
        filterdToDoLists = alltodos;
      } else {
        filterdToDoLists = alltodos.filter(todo =>
          todo.category === category
        );
      }
    }else {
      if(category === 'all') {
        const hasFinished = choosenState === 'finished' ? true : false;
        filterdToDoLists = alltodos.filter(todo =>
          todo.has_finished === hasFinished
        );
      } else {
        const hasFinished = choosenState === 'finished' ? true : false;
        filterdToDoLists = alltodos.filter(todo =>
          todo.category === category && todo.has_finished === hasFinished
        );
      }
    }
    this.setState({
      todos: filterdToDoLists
    })
  }


  handleFinishTask(taskid) {
    // finish a task
    const newTodos = this.state.todos;
    for(let i=0;i<newTodos.length;i++) {
      if (newTodos[i].id === taskid) {
        newTodos[i].has_finished = !newTodos[i].has_finished;
        break;
      }
    }

    console.log(newTodos);
    this.setState({
      todos: newTodos
    })
  }

  handleDeleteTask(taskid) {
    console.log(taskid);
  }

  // change category
  handleChangeCategory(category) {
    console.log(category);
    this.setState({
      currentCategory: category
    }, () => this.handleFilterTasks())
    
  }

  handleChangeState(choosenState) {
    this.setState({
      currentChoosen: choosenState
    }, () => this.handleFilterTasks())
  }


  render() {
    const categories = [{
      id: 0,
      name: 'all'
    }, ...this.state.categories];

    const categoryLists = categories.map((category) =>
      <Option
        value={category.name}
        key={category.id}>
        {category.name}
      </Option>
    );
    const whetherFinished = [
      <Option
        value='all'
        key={-1}>
        all
      </Option>,
      <Option
        value='finished'
        key={0}>
        finished
      </Option>,
      <Option
        value='notFinished'
        key={1}>
        wait to do
    </Option>,
    ]
    return (
      <div className="TaskBoard">
        <TaskInput categories={this.state.categories} onInputTextChange={this.handleInputSubmit} onInputCategory={this.handleInputCategory}/>
        <div >
          <Row style={{ textAlign: 'center' }}>
          choose category:
          <Select defaultValue="all" style={{ width: 120, marginTop: 40, marginLeft: 20 }} onChange={this.handleChangeCategory}>
            {categoryLists}
          </Select>
          </Row>
          <Row style={{ textAlign: 'center' }}>
          whether finished:
          <Select defaultValue="all" style={{ width: 120, marginTop: 40, marginLeft: 20 }} onChange={this.handleChangeState}>
            {whetherFinished}
          </Select>
          </Row>
          
        </div>

        <TaskLists
          onFinishTask={this.handleFinishTask}
          todos={this.state.todos} />
      </div>
    )
  }
}

export default Board;
