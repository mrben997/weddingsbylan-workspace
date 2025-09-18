import { once } from 'events';
import { ApplicationConfig, ServerApplication } from './application';
import http from 'http'
import express, { Request, Response } from 'express'
import { NextJsServer } from './nextjs-sevrer';
export class ExpressServer {
    public readonly app: express.Application;
    public readonly nextApp: NextJsServer;
    public readonly lbApp: ServerApplication;
    private server?: http.Server;

    constructor(options: ApplicationConfig = {}) {
        this.app = express();
        this.lbApp = new ServerApplication(options);
        this.nextApp = new NextJsServer
        //Nextjs

        this.nextApp.addPathExcepts("/api")

        this.app.use('/', this.nextApp.requestHandler);
        //REST FULL
        this.app.use('/api', this.lbApp.requestHandler);
    }

    async boot() {
        await this.lbApp.boot();
        await this.nextApp.boot();
    }
    public get url() {
        return `http://${this.lbApp.restServer.config.host || '127.0.0.1'}:${this.lbApp.restServer.config.port ?? 3000}/api`
    }
    public async start() {
        await this.lbApp.start();
        const port = this.lbApp.restServer.config.port ?? 3000;
        const host = this.lbApp.restServer.config.host || '127.0.0.1';
        this.server = this.app.listen(port, host);
        console.log(`Server is running at ${this.url}`);
        console.log(`Try ${this.url}/ping`);
        await once(this.server, 'listening');
    }
    // For testing purposes
    public async stop() {
        if (!this.server) return;
        await this.lbApp.stop();
        this.server.close();
        await once(this.server, 'close');
        this.server = undefined;
    }
}