import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000"
})

const Query = {
  // get all todos
  todos: async () => {
    const todos = await instance.get("/todo");
    return todos.data;
  },
  // get all categories
  categories: async () => {
    const categories = await instance.get("/categories");
    return categories.data;
  },
  // get a to do 
  todo: async (_, { id }) => {
    const todo = await instance.get(`/todo/${id}`);
    return todo.data;
  },
  // get a category
  category: async (_, { id }) => {
    const category = await instance.get(`/categories/${id}`);
    return category.data;
  }
}

const Todo = {
  category: async (parent) => {
    const category = await instance.get(`/categories/${parent.cate_id}`);
    return category.data;
  }
}

const Mutation = {
  // create a todo
  createTodo: async (_, { title, cate_id }) => {
    let result;
    await instance.post("/todo", {
      title: title,
      cate_id: cate_id
    }, {
        "headers": {
          "Content-Type": "application/json"
        }
      }).then(res => {
        result = res.data;
      }).catch(err => {
        return {
          title: "Something has gone wrong."
        };
      });
    return result;
  },
  // delete a todo
  deleteTodo: async (_, { todo_id }) => {
    let result;
    await instance.delete(`/todo/${todo_id}`)
      .then(res => {
        result = res.data;
      }).catch(err => {
        return err;
      })
    return result;
  },
  // updateTodo
  updateTodo: async ( _, { todo_id, title, cate_id }) => {
    let result;
    await instance.put(`/todo/${todo_id}`, {
      title: title,
      cate_id: cate_id
    },{
      "headers": {
        "Content-Type": "application/json"
      }
    }).then(res => {
      result = res.data;
    }).catch(err => {
      result = err.data;
    });
    return result;
  },
  // change the state of a todo
  changeTodo: async (_, { todo_id }) => {
    let result;
    await instance.patch(`/todo/${todo_id}`)
      .then(res => {
        result = res.data;
      }).catch(err => {
        result = err.data;
      })
    return result;
  },
  // create a category
  createCategory: async ( _, { name, description }) => {
    let result;
    await instance.post("categories", {
      name: name,
      description: description
    }, {
      "headers": {
        "Content-Type": "application/json"
      }
    }).then(res => {
      result = res.data;
    }).catch(err => {
      result = err.data;
    });
    return result;
  },
  // delete a category
  deleteCategory: async ( _, { cate_id }) => {
    let result;
    await instance.delete(`/categories/${cate_id}`)
    .then(res => {
      result = res.data;
    }).catch(err => {
      result = err.data;
    });
    return result;
  },
  // update a category
  updateCategory: async ( _, { cate_id, name, description }) => {
    let result;
    await instance.put(`/categories/${cate_id}`, {
      name: name,
      description: description
    }, {
      "headers": {
        "Content-Type": "application/json"
      }
    }).then(res => {
      result = res.data;
    }).catch(err => {
      result = err.data;
    });
    return result;
  },
}

const resolvers = {
  Query,
  Todo,
  Mutation
};

export default resolvers;
