import { controller, httpDelete, httpGet, httpPost, httpPut, request } from 'inversify-express-utils';
import TYPES from '../constant/types';
import { CacheService } from '../services/cacheService';
import { inject } from 'inversify';
import { HttpError } from '../constant/httperror';

@controller('/api/cache')
class CacheController {
    constructor(
        @inject(TYPES.Cache) readonly cacheService : CacheService,
    ){}

    @httpGet('/:id')
    public async retrieve(@request() req) {
        try {
            return await this.cacheService.findOrCreate(req.params.id);
        } catch (e){
            throw new HttpError(
                e,
                500
            )
        }
    };

    @httpGet('/')
    public async retrieveAll(@request() req) {
        try {
            return await this.cacheService.findAll();
        } catch (e){
            throw new HttpError(
                e,
                500
            )
        }
    }

    @httpPut('/')
    public async update(@request() req){
        try {
            return await this.cacheService.createOrUpdate(req.body.key, req.body.value);
        } catch (e){
            throw new HttpError(
                e,
                500
            )
        }
    }

    @httpDelete('/:id')
    public async remove(@request() req){
        try {
            return await this.cacheService.deleteOne(req.params.id);
        } catch (e){
            throw new HttpError(
                e,
                500
            )
        }
    }

    @httpDelete('/')
    public async removeAll(@request() req){
        try {
            return await this.cacheService.deleteAll();
        } catch (e){
            throw new HttpError(
                e,
                500
            )
        }
    }
}