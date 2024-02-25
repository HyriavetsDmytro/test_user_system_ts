import * as express from 'express';
import * as bodyParser from 'body-parser';
import Controller from './src/Entity/controller_interface';
import errorMiddleware from './src/Controllers/middleware/error_middleware';
import loggerMiddleware from './src/Controllers/middleware/logger_midddleware';

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express.default();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(process.env.SERVER_PORT, () => {
      console.log(`App listening on the port ${process.env.SERVER_PORT}`);
    });
  }
  private initializeMiddlewares() {
    this.app.use(bodyParser.json({ type: 'application/json' }));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.static("public"));
    this.app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
      next();
    });
    
    this.app.use(loggerMiddleware);
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
      //console.log( controller.router)
    });
  }
}

export default App;
