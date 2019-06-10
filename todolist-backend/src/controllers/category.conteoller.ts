import * as express from 'express';
import Categories from "../models/categories";
import connectDatabase from "../utils/connectDatabase";

class CategoriesController {
  public path = '/categories/';
  public router = express.Router();
  private connection = connectDatabase();

  constructor() {
    this.initializeRoutes();
  }

  public initializeRoutes() {
    this.router.get(this.path, this.getAllCategories);
    this.router.get(`${this.path}:id`, this.getCategoryById);
    this.router.post(this.path, this.createACategory);
    this.router.delete(`${this.path}:id`, this.deleteACategory);
    this.router.put(`${this.path}:id`, this.modifyACategory);
  }

  // Retrieve
  getAllCategories = (request: express.Request, response: express.Response) => {
    this.connection.then(async connection => {
      let categoryRepository = await connection.getRepository(Categories);
      const allCategories = await categoryRepository.find();
      response.send(allCategories);
    }).catch(error => {
      response.status(500).send(error);
    })
  }

  getCategoryById = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    this.connection.then(async connection => {
      let categoryRepository = await connection.getRepository(Categories);
      const category = await categoryRepository.findOne(id);
      response.send(category);
    }).catch(error => {
      response.status(500).send(error);
    })
  }

  // Create
  createACategory = (request: express.Request, response: express.Response) => {
    let category = new Categories();
    let body = request.body;
    category.name = body.name;
    category.description = body.description;
    this.connection.then(async connection => {
      await connection.manager.save(category);
      response.status(201).send(category);
    }).catch(error => {
      response.status(500).send(error);
    })
  }

  // Delete
  deleteACategory = (request: express.Request, response: express.Response) => {
    const id = request.params.id;
    this.connection.then(async connection => {
      let categoryRepository = await connection.getRepository(Categories);
      let category = await categoryRepository.findOne(id);
      await categoryRepository.remove(category);
      response.status(200).send(category);
    }).catch(error => {
      response.status(500).send(error);
    })
  }

    // Modify
    modifyACategory = (request: express.Request, response: express.Response) => {
      const id = request.params.id;
      let body = request.body;
      this.connection.then(async connection => {
        let categoryRepository = await connection.getRepository(Categories);
        let category = await categoryRepository.findOne(id);
        category.name = body.name;
        category.description = body.description;
        await categoryRepository.save(category);
        response.status(200).send(category);
      }).catch(error => {
        response.status(500).send(error);
      })
    }
}

export default CategoriesController;
