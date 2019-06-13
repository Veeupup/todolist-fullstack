import * as React from 'react';
import TodoList from '../todolists';
import TaskInput from '../taskinput';
import { GET_CATEGORIES, GET_TODOS } from '../../api/gqls';

import { ApolloError } from 'apollo-boost';
import { withApollo, WithApolloClient, Query } from 'react-apollo';
import client from '../../api';

export interface Props {
  name: string
}

interface todoResult {
  loading: boolean,
  error?: ApolloError,
  data: {
    todos: { title: string, category: { name: string, cate_id: number }, todo_id: number, is_finished: boolean }[]
  }
}

interface categoryResult {
  loading: boolean,
  error?: ApolloError,
  data: {
    categories: { cate_id: number, name: string, description: string }[]
  }
}

class Board extends React.Component<WithApolloClient<Props>, object> {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      currentCategory: 0,
      currentChoosen: 'all',
    }

    this.handleChangeCategory = this.handleChangeCategory.bind(this);

  }

  handleChangeCategory(cate_id) {
    let todos: { todos: { title: string, category: { name: string, cate_id: number }, todo_id: number, is_finished: boolean }[] };
    if (client.cache.readQuery({ query: GET_TODOS })) {
      todos = client.cache.readQuery({ query: GET_TODOS });
    }
    let newTodos;
    if (todos) {
      newTodos = todos.todos.filter((todo) => todo.category.cate_id === cate_id)
    }
    this.setState({
      todos: newTodos
    })
  }

  render() {
    return (
      <div className="board" style={{ padding: "0 20%" }}>
        <div className="taskInput" style={{ marginBottom: "20px" }}>
          <Query query={GET_CATEGORIES}>
            {({ loading, error, data }: categoryResult) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;
              return (
                <div>
                  <TaskInput categories={data.categories} />
                </div>
              )
            }}
          </Query>

        </div>
        <div>
          <Query query={GET_TODOS}>
            {({ loading, error, data }: todoResult) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;
              return <TodoList  todos={data.todos} name="todo" />
            }}
          </Query>
        </div>
      </div>
    )
  }
}

export default withApollo(Board);
