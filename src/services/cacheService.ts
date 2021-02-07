import { injectable } from "inversify";
import { ICache } from "../interfaces/interfaces";
import crypto from 'crypto';
import moment from 'moment';
import Cache from '../models/cache';

@injectable()
export class CacheService {
    // TTL check
    ttl = {
        $lt : moment().add(process.env.CACHE_TTL_MINUTES, 'minutes').toDate(),
        $gt : moment().subtract(process.env.CACHE_TTL_MINUTES, 'minutes').toDate()
    }

    public async findOrCreate(key : string) {
        const cache = await Cache.findOne({key, lastUpdate : this.ttl});
        if(!cache) {
            console.log('Cache miss');
            const newCache : ICache = {
                key,
                value : crypto.randomBytes(20).toString('hex'),
                lastUpdate : moment().toDate()
            };
            return await this.create(newCache);
        } else {
            console.log('Cache hit');
            cache.lastUpdate = moment().toDate();
            return await cache.save();
        }
    }

    public async findAll(){
        return await Cache.find({lastUpdate : this.ttl});
    }

    public async createOrUpdate(key : string, value : string){
        const data : ICache = {
            key,
            value : value ? value : crypto.randomBytes(20).toString('hex'), // be sure to don't save a key without value
            lastUpdate : moment().toDate()
        };
        const cache = await Cache.findOneAndUpdate({key : data.key}, data, {new : true});
        
        if(!cache){
            return this.create(data);
        }
        return cache;
    }

    public async deleteOne(key){
        return await Cache.deleteOne({key});
    }

    public async deleteAll(){
        return await Cache.deleteMany();
    }

    private async create(cacheData : ICache){
        // check if we reach the limit of the cache
        const count = await Cache.count();
        if(count < parseInt(process.env.CACHE_LIMIT)){
            return await Cache.create(cacheData);
        } else {
            // if we are over the limit we are going to overwrite the oldest entry in our db
            let oldestCache = await Cache.findOne().sort({lastUpdate: 1});
            oldestCache.set(cacheData);
            return await oldestCache.save();
        }
    }
} 