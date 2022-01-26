import Redis from "ioredis";
import {REDIS_HOST, REDIS_PORT} from '../config'

class Storage {
    private redis: Redis;

    constructor() {
        this.redis = new Redis({
            host: REDIS_HOST,
            port: REDIS_PORT
        });
    }

    set(name, value) {
        this.redis.set(name, JSON.stringify(value));
    }

    reset(){
        this.redis.del('account_100')
    }

    async get(name) {
        try {
            let data = await this.redis.get(name)
            return JSON.parse(data);
        } catch (e) {
            return JSON.parse('');
        }
    }
}

export default Storage;