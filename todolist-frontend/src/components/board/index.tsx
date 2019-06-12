import * as React from 'react';
import TodoList from '../todolists';
import TaskInput from '../taskinput';
import { GET_CATEGORIES, GET_TODOS } from '../../api/gqls';

import {  ApolloError } from 'apollo-boost';
import { withApollo, WithApolloClient, Query } from 'react-apollo';


export interface Props {
  name: string
}

interface todoResult {
  loading: boolean,
  error?: ApolloError,
  data: {
    todos: { title: string, category: { name: string }, todo_id: number, is_finished: boolean }[]
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
  render() {
    const { client } = this.props;
    console.log(client);
    return (
      <div className="board" style={{ padding: "0 20%" }}>
        <div className="taskInput" style={{ marginBottom: "20px" }}>
          <Query query={GET_CATEGORIES}>
            {({ loading, error, data }: categoryResult) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;
              console.log(data.categories);
              return <TaskInput categories={data.categories} />
            }}
          </Query>
        </div>
        <div>
          <Query query={GET_TODOS}>
            {({ loading, error, data }: todoResult) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;
                console.log(data.todos[0])
              return <TodoList todos={data.todos} name="todo" />
            }}
          </Query>
        </div>
      </div>
    )
  }
}

export default  withApollo(Board);
