import express from 'express';
import loggerMiddleware from './middlewares/middleware';
import bodyParser from 'body-parser';
import "reflect-metadata";


class App {

  public app: express.Application;
  public port: number;

  constructor(controllers, port) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  // middlewares
  private initializeMiddlewares() {
    this.app.use(loggerMiddleware);
    this.app.use(bodyParser.json());
  }

  // initial controllers
  private initializeControllers(controllers) {
    controllers.forEach(controller => {
      this.app.use('/', controller.router);
    });
  }

  // start listening
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App is listening on the port ${this.port}`);
    })
  }


}

export default App;
