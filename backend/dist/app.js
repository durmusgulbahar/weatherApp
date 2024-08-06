"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
//import ErrorHandler from "./middleware/error-handler";
//import Database from "./config/db";
const dotenv_1 = __importDefault(require("dotenv"));
//import userRoutes from "./routes/user.routes";
//import taskRoutes from "./routes/task.routes";
//import authRoutes from "./routes/auth.routes";
const weather_routes_1 = __importDefault(require("./routes/weather.routes"));
dotenv_1.default.config();
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = parseInt(process.env.PORT || "3000");
        this.init();
    }
    //inits all of the funcs
    init() {
        this.initConfig(); // starts db
        this.initMiddlewares();
        this.initRoutes();
        this.initErrorHandling();
    }
    //db
    initConfig() {
        // new Database();
    }
    initMiddlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use((0, helmet_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        dotenv_1.default.config();
    }
    //routes
    initRoutes() {
        this.app.use("/api/v1", weather_routes_1.default);
    }
    //error handler
    initErrorHandling() {
        //this.app.use(ErrorHandler.notFound);
        //this.app.use(ErrorHandler.serverError);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server is running on http://localhost:${this.port}`);
        });
    }
}
exports.default = App;
