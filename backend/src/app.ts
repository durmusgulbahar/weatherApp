import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
//import ErrorHandler from "./middleware/error-handler";
//import Database from "./config/db";
import dotenv from "dotenv";
//import userRoutes from "./routes/user.routes";
//import taskRoutes from "./routes/task.routes";
//import authRoutes from "./routes/auth.routes";
import weatherRoutes from "./routes/weather.routes";
dotenv.config();

class App {
  private readonly app: Application;
  private readonly port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || "3000");
    this.init();
  }

  //inits all of the funcs
  private init() {
    this.initConfig(); // starts db
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
  }

  //db
  private initConfig() {
   // new Database();
  }

  private initMiddlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    dotenv.config();
  }

  //routes
  private initRoutes() {
    this.app.use("/api/v1", weatherRoutes);
   
  }

  //error handler
  private initErrorHandling() {
    //this.app.use(ErrorHandler.notFound);
    //this.app.use(ErrorHandler.serverError);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }
}

export default App;
