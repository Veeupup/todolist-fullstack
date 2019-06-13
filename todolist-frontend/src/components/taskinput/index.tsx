import React from 'react';
import { Input, Select } from 'antd';
import { Mutation } from 'react-apollo';
import { GET_TODOS, ADD_TODO, GET_TODO_BYCATE } from '../../api/gqls';
import { withApollo, WithApolloClient, ApolloConsumer } from 'react-apollo';

const { Option } = Select;

export interface Props {
  categories: { cate_id: number, name: string, description: string }[]
}



class TaskInput extends React.Component<WithApolloClient<Props>, object> {
  render() {
    let { client } = this.props;
    let input;
    let cate_id = 1;
    const categories = this.props.categories.map((category) => <Option
      value={category.cate_id}
      key={category.cate_id}>
      {category.name}
    </Option>);

    const extraCategories = categories.concat([<Option value="0" key="0">
      all
      </Option>])

    const selectBofore = (
      <Select defaultValue="1" onChange={value => { cate_id = Number( value )}}>
        {categories}
      </Select>
    );



    return (
      <div>
        <Mutation
          mutation={ADD_TODO}
          update={async (cache: any, { data: { createTodo } }) => {
            const { data } = await client.query({
              query: GET_TODOS,
            });
            const newTodos = [createTodo].concat(data.todos)
            client.writeQuery({
              query: GET_TODOS,
              data: { todos: newTodos },
            });
          }}
        >
          {
            addTodo => (
              <div>
                <form onSubmit={e => {
                  e.preventDefault();
                  addTodo({ variables: { title: input.state.value, cate_id: Number(cate_id) } })
                  input.state.value = ""
                }}>
                  <Input style={{ width: "60%" }} ref={node => { input = node }} addonBefore={selectBofore} />
                  <button style={{ display: "inline-block" }} type="submit">ADD ToDo</button>
                </form>

              </div>
            )
          }
        </Mutation>
        <ApolloConsumer>
          {
            client => (
              <div className="filterCate" style={{ margin: "20px 0" }}>
                <Select defaultValue="0" onChange={ async (value) => {
                  const { data } = await client.query({
                    query: GET_TODO_BYCATE,
                    variables: { cate_id: value },
                    fetchPolicy: 'network-only',
                  })
                  client.writeQuery({
                    query: GET_TODOS,
                    data: { todos: data.todos },
                  })
                }}>
                  {extraCategories}
                </Select>
              </div>
            )
          }

        </ApolloConsumer>
      </div>
    )
  }

}

export default withApollo(TaskInput);
