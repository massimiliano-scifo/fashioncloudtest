import 'reflect-metadata';
import { expect } from 'chai';
import chai from 'chai';
import { app } from '../src/app';
import chaiHttp from 'chai-http';

chai.use(chaiHttp)
describe('Cache tests', () => {
    const randomString = Math.random().toString(36).substring(7);
    
    it('create an event without value', async ()=>{
        const request = await chai.request(app).put('/api/cache/').send({
            key : randomString
        })
        expect(request.status).to.be.equal(200);
    });
    it('create an event with value', async ()=>{
        const request = await chai.request(app).put('/api/cache/').send({
            key : randomString,
            value : Math.random().toString(36).substring(7)
        })
        expect(request.status).to.be.equal(200);
    });

    it('get an event', async ()=> {
        const request = await chai.request(app).get(`/api/cache/${randomString}`);
        expect(request.status).to.be.equal(200);
    });

    it(`check that there are only ${process.env.CACHE_LIMIT} entries`, async ()=>{
        const request = await chai.request(app).get('/api/cache');
        console.log(request.body)
        expect(request.status).to.be.equal(200);
        expect(request.body.length).not.equal(0);
        expect(request.body.length).to.be.lessThan(parseInt(process.env.CACHE_LIMIT));
    });
});