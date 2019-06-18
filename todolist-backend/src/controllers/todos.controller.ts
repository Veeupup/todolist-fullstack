import * as express from "express";
import Todo from "../models/todos";
import connectDatabase from "../utils/connectDatabase";
import { Connection } from "typeorm";

class TodosController {
  public path = "/todo/";
  public router = express.Router();
  private connection = connectDatabase();

  public constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes(): void {
    this.router.get(this.path, this.getAllTodos);
    this.router.get(`${this.path}:id`, this.getTodoById);
    this.router.post(this.path, this.createATodo);
    this.router.delete(`${this.path}:id`, this.deleteATodo);
    this.router.put(`${this.path}:id`, this.modifyToDo);
    this.router.patch(`${this.path}:id`, this.changeTodo);
  }

  // Create
  private createATodo = (
    request: express.Request,
    response: express.Response
  ): void => {
    let todo = new Todo();
    let body = request.body;
    todo.title = body.title;
    todo.cate_id = body.cate_id;
    this.connection
      .then(
        async (connection): Promise<Connection> => {
          await connection.manager.save(todo);
          response.status(201).send(todo);
          return connection;
        }
      )
      .catch((error): void => {
        response.status(500).send(error);
      });
  };

  // change the state of a todo
  private changeTodo = (
    request: express.Request,
    response: express.Response
  ): void => {
    const id = request.params.id;
    this.connection
      .then(
        async (connection): Promise<Connection> => {
          let todoRepository = await connection.getRepository(Todo);
          let todo = await todoRepository.findOne(id);
          todo.is_finished = !todo.is_finished;
          await todoRepository.save(todo);
          response.status(200).send(todo);
          return connection;
        }
      )
      .catch((error): void => {
        response.status(500).send(error);
      });
  };

  // Modify
  private modifyToDo = (
    request: express.Request,
    response: express.Response
  ): void => {
    const id = request.params.id;
    let body = request.body;
    this.connection
      .then(
        async (connection): Promise<Connection> => {
          let todoRepository = await connection.getRepository(Todo);
          let todo = await todoRepository.findOne(id);
          todo.title = body.title;
          todo.cate_id = body.cate_id;
          await todoRepository.save(todo);
          response.status(200).send(todo);
          return connection;
        }
      )
      .catch((error): void => {
        response.status(500).send(error);
      });
  };

  // Get All
  private getAllTodos = (
    request: express.Request,
    response: express.Response
  ): void => {
    const cate_id = request.query.cate_id;
    this.connection
      .then(
        async (connection): Promise<Connection> => {
          let todoRepository = await connection.getRepository(Todo);
          let allTodos = await todoRepository.find();
          if (cate_id && cate_id != 0) {
            allTodos = allTodos.filter(
              (todo): Todo => {
                if (todo.cate_id == cate_id) {
                  return todo;
                }
              }
            );
          }
          response.send(allTodos.reverse());
          return connection;
        }
      )
      .catch((error): void => {
        response.status(500).send(error);
      });
  };

  // Retrieve
  private getTodoById = (
    request: express.Request,
    response: express.Response
  ): void => {
    const id = request.params.id;
    this.connection
      .then(
        async (connection): Promise<Connection> => {
          let todoRepository = await connection.getRepository(Todo);
          let todo = await todoRepository.findOne(id);
          response.send(todo);
          return connection;
        }
      )
      .catch((error): void => {
        response.status(500).send(error);
      });
  };

  // Delete
  private deleteATodo = (
    request: express.Request,
    response: express.Response
  ): void => {
    const id = request.params.id;
    this.connection
      .then(
        async (connection): Promise<Connection> => {
          let todoRepository = await connection.getRepository(Todo);
          let todo = await todoRepository.findOne(id);
          await todoRepository.remove(todo);
          todo.todo_id = id;
          response.status(200).send(todo);
          return connection;
        }
      )
      .catch((error): void => {
        response.status(500).send(error);
      });
  };
}

export default TodosController;
