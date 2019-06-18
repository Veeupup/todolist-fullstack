import express from "express";
import loggerMiddleware from "./middlewares/middleware";
import bodyParser from "body-parser";
import "reflect-metadata";

class App {
  public app: express.Application;
  public port: number;

  public constructor(controllers, port) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  // middlewares
  private initializeMiddlewares(): void {
    this.app.use(loggerMiddleware);
    this.app.use(bodyParser.json());
  }

  // initial controllers
  private initializeControllers(controllers: []): void {
    controllers.forEach((controller: { router }): void => {
      this.app.use("/", controller.router);
    });
  }

  // start listening
  public listen(): void {
    this.app.listen(this.port, (): void => {
      console.log(`App is listening on the port ${this.port}`);
    });
  }
}

export default App;
