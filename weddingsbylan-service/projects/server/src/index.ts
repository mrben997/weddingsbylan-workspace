import dotenv from 'dotenv';
const env = process.env.NODE_ENV || 'development';
console.log("loading " + env);
dotenv.config({ path: `.env.${env}` });

import { ApplicationConfig, ServerApplication } from './application';
import { ExpressServer } from './server';

export * from './application';

export async function main(options: ApplicationConfig = {}) {
  // const app = new ServerBuilderApplication(options);
  // await app.boot();
  // await app.start();
  // const url = app.restServer.url;
  // console.log(`Server is running at ${url}`);
  // console.log(`Try ${url}/ping`);
  // return app;

  const server = new ExpressServer(options);
  await server.boot();
  await server.start();
}

if (require.main === module) {
  // Run the application
  const config = {
    rest: {
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
      listenOnStart: false,
    },
  };
  main(config).catch(err => {
    console.error('Cannot start the application.', err);
    process.exit(1);
  });
}