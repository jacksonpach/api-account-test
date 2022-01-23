import Redis from "ioredis";

class Storage {
    private redis: Redis;

    constructor() {
        this.redis = new Redis({
            host: 'redis',
            port: '6379'
        });
    }

    set(name, value) {
        this.redis.set(name, JSON.stringify(value));
    }

    async get(name) {
        let data = await this.redis.get(name)
        return JSON.parse(data);
    }
}

export default Storage;