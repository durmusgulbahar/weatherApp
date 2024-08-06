import { createClient } from 'redis';



class RedisService {
    public client: any;

    constructor(){
        this.clientConnect();
    }

    async clientConnect() {
        this.client = createClient();
        this.client.on('error', (err: any) => console.log('Redis Client Error', err));
        await this.client.connect();
        console.log("Redis Client connected successfully")
    }
}

export default RedisService;

