import React, { Component } from 'react';
import { Input, Select } from 'antd';

const Search = Input.Search;
const { Option } = Select;


class TaskInput extends Component {
  constructor(props) {
    super(props);

    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.handleInputCategory = this.handleInputCategory.bind(this);
  }

  handleInputSubmit(value) {
    this.props.onInputTextChange(value);
  }

  handleInputCategory(category) {
    console.log(category);
    this.props.onInputCategory(category);
  }

  render() {
    const categories = this.props.categories.map((category) => 
    <Option
        value={category.name}
        key={category.id}>
        {category.name}
      </Option>
    )
    const selectBefore = (
      <Select defaultValue="job" style={{ width: 120 }} onChange={value => this.handleInputCategory(value)}>
        {categories}
      </Select>
    )
    return (
      <div className="searchInput" style={{ margin: '0 auto' }}>
            <Search
              style={{ maxWidth: 600 }}
              placeholder="input you task ......"
              enterButton="Add It!"
              size="large"
              addonBefore={selectBefore}
              onSearch={value => this.handleInputSubmit(value)}
            />
      </div>
    )
  }
}

// <Col  span={2} >
//             <Select defaultValue="job" style={{ width: 120,  marginLeft: 20 }} onChange={value => this.handleInputCategory(value)}>
//               {categories}
//             </Select>
//           </Col>


export default TaskInput;
