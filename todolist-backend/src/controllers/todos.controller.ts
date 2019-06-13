import * as express from 'express';
import Todo from "../models/todos";
import connectDatabase from "../utils/connectDatabase";
import { request } from 'https';

class TodosController {
  public path = '/todo/';
  public router = express.Router();
  private connection = connectDatabase();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllTodos);
    this.router.get(`${this.path}:id`, this.getTodoById);
    this.router.post(this.path, this.createATodo);
    this.router.delete(`${this.path}:id`, this.deleteATodo);
    this.router.put(`${this.path}:id`, this.modifyToDo);
    this.router.patch(`${this.path}:id`, this.changeTodo);
  }

  // Create
  createATodo = (request: express.Request, response: express.Response) => {
    let todo = new Todo();
    let body = request.body;
    todo.title = body.title;
    todo.cate_id = body.cate_id;
    this.connection.then(async connection => {
      await connection.manager.save(todo);
      response.status(201).send(todo);
    }).catch(error => {
      response.status(500).send(error);
    })
  }

  // change the state of a todo
  changeTodo = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    this.connection.then(async connection => {
      let todoRepository = await connection.getRepository(Todo);
      let todo = await todoRepository.findOne(id);
      todo.is_finished = !todo.is_finished;
      await todoRepository.save(todo);
      response.status(200).send(todo);
    }).catch(error => {
      response.status(500).send(error);
    })
  }

  // Modify
  modifyToDo = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    let body = request.body;
    this.connection.then(async connection => {
      let todoRepository = await connection.getRepository(Todo);
      let todo = await todoRepository.findOne(id);
      todo.title = body.title;
      todo.cate_id = body.cate_id;
      await todoRepository.save(todo);
      response.status(200).send(todo);
    }).catch(error => {
      response.status(500).send(error);
    })
  }

  // Get All
  getAllTodos = (request: express.Request, response: express.Response) => {
    const cate_id = request.query.cate_id;
    console.log(cate_id)
    this.connection.then(async connection => {
      let todoRepository = await connection.getRepository(Todo);
      let allTodos = await todoRepository.find();
      if(cate_id && cate_id!=0) {
        allTodos = allTodos.filter(todo => todo.cate_id==cate_id)
      }
      response.send(allTodos.reverse());
    }).catch(error => {
      response.status(500).send(error);
    })
  }

  // Retrieve
  getTodoById = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    this.connection.then(async connection => {
      let todoRepository = await connection.getRepository(Todo);
      let todo = await todoRepository.findOne(id);
      response.send(todo);
    }).catch(error => {
      response.status(500).send(error);
    })
  }

  // Delete
  deleteATodo = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    this.connection.then(async connection => {
      let todoRepository = await connection.getRepository(Todo);
      let todo = await todoRepository.findOne(id);
      await todoRepository.remove(todo);
      todo.todo_id = id;
      response.status(200).send(todo);
    }).catch(error => {
      response.status(500).send(error);
    })
  }
}

export default TodosController;
