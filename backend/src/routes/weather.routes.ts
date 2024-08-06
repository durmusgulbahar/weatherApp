import { Router } from "express";
import WeatherController from "../controllers/weather.controller";


class WeatherRoutes {
    private readonly weatherController: WeatherController;
    public readonly router:Router;
    
    constructor(){
        this.weatherController = new WeatherController();
        this.router= Router();
        this.initRoutes();
    }

    



    initRoutes(){
        this.router.get("/:city",this.weatherController.getWeatherData.bind(this.weatherController));
    }

    
}

export default new WeatherRoutes().router;