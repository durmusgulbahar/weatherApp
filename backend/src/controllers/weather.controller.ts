import { Request, Response } from "express";
import { createClient } from 'redis';
import { WeatherForecastResponse } from "../interfaces/IWeatherForecastResponse";
import RedisService from "../services/redis.service";
class WeatherController {
    private baseUrl = `https://api.openweathermap.org/data/2.5`

    redisClient = new RedisService().client;
    async getWeatherData(req: Request, res: Response) {
        try {
            const { city } = req.params;
            const url = `${this.baseUrl}/forecast?q=${city}&appid=${process.env.API_KEY}&cnt=56`;

            // Check if data is in Redis
            const cachedData = await this.redisClient.get(url);

            if (!cachedData) {
                console.log(`Data about ${city} not found in Redis, fetching from API`);

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data: WeatherForecastResponse = await response.json();

                // Cache the data in Redis with an expiration time (e.g., 1 hour)
                await this.redisClient.setEx(url, 3600, JSON.stringify(data));
                console.log(`Data about ${city} saved to Redis`);
                console.log("Sending response to user");

                res.status(200).json(data);
            } else {
                console.log(`Data about ${city} found in Redis, sending response`);
                const data: WeatherForecastResponse = JSON.parse(cachedData);
                res.status(200).json(data);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            res.status(500).json({ error: error });
        }
        console.log("*********************************************************")
    }
}

export default WeatherController;