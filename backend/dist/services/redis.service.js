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
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
class RedisService {
    constructor() {
        this.clientConnect();
    }
    clientConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.client = (0, redis_1.createClient)();
            this.client.on('error', (err) => console.log('Redis Client Error', err));
            yield this.client.connect();
            console.log("Redis Client connected successfully");
        });
    }
}
exports.default = RedisService;
