import express, { NextFunction, Request, Response } from 'express'
import { IncomingMessage, ServerResponse } from 'http';
import nextjs from 'next'
import { RequestHandler } from 'next/dist/server/next';
import path from 'path';

export type RequestHandlerMiddleWare = (req: IncomingMessage, res: ServerResponse, next: NextFunction) => void
export class NextJsServer {
    constructor() {
        const dev = process.env.NODE_ENV !== 'production'
        this.server = nextjs({
            dev,
            dir: path.join(__dirname, "../../app-client")
        })
        this.appHandler = this.server.getRequestHandler()
    }
    pathExcepts: string[] = []
    addPathExcepts = (path: string) => {
        this.pathExcepts.push(path)
        return this
    }

    server: ReturnType<typeof nextjs>
    appHandler: RequestHandler
    boot = async () => {
        await this.server.prepare()
    }
    requestHandler: RequestHandlerMiddleWare = (req, res, next) => {
        if (this.pathExcepts.some(x => req.url?.startsWith(x))) {
            next()
            return
        }
        this.appHandler(req, res).catch(err => next(err));
    }
}