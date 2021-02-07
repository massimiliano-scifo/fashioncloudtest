import 'reflect-metadata';
import express from 'express';
import { InversifyExpressServer } from 'inversify-express-utils';
import cors from 'cors';
import * as bodyParser from 'body-parser';
import {ContainerConfigLoader} from "./constant/container";
import {DbConnection} from "./db/dbConnection";

const container = ContainerConfigLoader.Load();

DbConnection.initConnection();
let server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
        }));
    app.use(bodyParser.json());
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: false}));
});

const app = server.build();
app.listen(80);
console.log('Server started on port 80 :)');

export { app };