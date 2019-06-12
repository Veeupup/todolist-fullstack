import React from 'react';
import { Input, Select, Button } from 'antd';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { GET_TODOS, ADD_TODO } from '../../api/gqls';
import { withApollo, WithApolloClient } from 'react-apollo';

const Search = Input.Search;
const { Option } = Select;

export interface Props {
  categories: { cate_id: number, name: string, description: string }[]
}



class TaskInput extends React.Component<WithApolloClient<Props>, object> {
  render() {
    let input;
    let cate_id=1;
    const categories = this.props.categories.map((category) => <Option
      value={category.cate_id}
      key={category.cate_id}>
      {category.name}
    </Option>);
    const selectBofore = (
      <Select defaultValue="1"  onChange={ value => { cate_id = value } }>
        {categories}
      </Select>
    );
      
    return (
      <Mutation
        mutation={ADD_TODO}
        update={(cache: any, { data: { createTodo } }  ) => {
          const { todos } = cache.readQuery({ query: GET_TODOS })
          cache.writeQuery({
            query: GET_TODOS,
            data: { todos: todos.reverse().concat([createTodo]) },
          });
        }}
      >
        {
           addTodo => (
            <div>
              <form onSubmit={e => {
                e.preventDefault();
                addTodo({ variables: { title: input.state.value, cate_id: Number(cate_id) } })
                input.state.value=""
              }}>
                <Input ref={ node => { input = node } } addonBefore={selectBofore}  /> 
                <button type="submit">ADD ToDo</button>
              </form>
  
            </div>
          )
        }

      </Mutation>

    )
  }

}

export default withApollo(TaskInput);
