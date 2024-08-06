"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_service_1 = __importDefault(require("../services/redis.service"));
class WeatherController {
    constructor() {
        this.baseUrl = `https://api.openweathermap.org/data/2.5`;
        this.redisClient = new redis_service_1.default().client;
    }
    getWeatherData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { city } = req.params;
                const url = `${this.baseUrl}/forecast?q=${city}&appid=${process.env.API_KEY}&cnt=20`;
                // Check if data is in Redis
                const cachedData = yield this.redisClient.get(url);
                if (!cachedData) {
                    console.log(`Data about ${city} not found in Redis, fetching from API`);
                    const response = yield fetch(url);
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    const data = yield response.json();
                    // Cache the data in Redis with an expiration time (e.g., 1 hour)
                    yield this.redisClient.setEx(url, 3600, JSON.stringify(data));
                    console.log(`Data about ${city} saved to Redis`);
                    console.log("Sending response to user");
                    res.status(200).json(data);
                }
                else {
                    console.log(`Data about ${city} found in Redis, sending response`);
                    const data = JSON.parse(cachedData);
                    res.status(200).json(data);
                }
            }
            catch (error) {
                console.error("Error fetching weather data:", error);
                res.status(500).json({ error: error });
            }
            console.log("*********************************************************");
        });
    }
}
exports.default = WeatherController;
