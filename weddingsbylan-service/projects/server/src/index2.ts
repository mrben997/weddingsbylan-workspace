// import { VercelRequest, VercelResponse } from '@vercel/node';
// import { ServerApplication } from './application';
// import './controllers'
// import './datasources'
// import './models'
// import './repositories'
// import 'loopback-connector-postgresql'
// const config = {
//     rest: {
//         gracePeriodForClose: 5000,
//         openApiSpec: {
//             setServersFromRequest: true,
//         },
//     },
// };

// const app = new ServerApplication(config);
// export default async function (req: VercelRequest, res: VercelResponse) {
//     // const modules = require('./controllers/index')
//     // console.log({ modules });
//     // for (let index = 0; index < modules.length; index++) {
//     //     const element = modules[index];
//     //     app.controller(element)
//     // }
//     await app.boot();
//     // await app.start();
//     const url = app.restServer.url;
//     console.log(`Server is running at ${url}`);
//     app.restServer.requestHandler(req, res);
// }
