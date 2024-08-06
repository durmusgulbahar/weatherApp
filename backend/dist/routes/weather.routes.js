"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const weather_controller_1 = __importDefault(require("../controllers/weather.controller"));
class WeatherRoutes {
    constructor() {
        this.weatherController = new weather_controller_1.default();
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get("/:city", this.weatherController.getWeatherData.bind(this.weatherController));
    }
}
exports.default = new WeatherRoutes().router;
