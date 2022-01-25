import Redis from "ioredis";

class Storage {
    private redis: Redis;

    constructor() {
        this.redis = new Redis({
            host: 'localhost',
            port: '6379'
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