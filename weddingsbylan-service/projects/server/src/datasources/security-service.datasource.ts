import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';
import dotenv from 'dotenv';
const env = process.env.NODE_ENV || 'development';
console.log("loading " + env);
dotenv.config({ path: `.env.${env}` });

// const config = {
//   name: 'SecurityService',
//   connector: 'mysql',
//   url: 'mysql://user:dBA1LzjI4Uu83Gq@localhost/security-service',
//   host: 'localhost',
//   port: 3306,
//   user: 'user',
//   password: 'dBA1LzjI4Uu83Gq',
//   database: 'security-service'
// };
//Dev
// const config = {
//   name: 'SecurityService',
//   connector: 'postgresql',
//   url: 'postgres://default:GNAKucSoHy02@ep-bitter-sunset-a4b4ncrz.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require',
//   host: 'ep-bitter-sunset-a4b4ncrz.us-east-1.aws.neon.tech',
//   port: 5432,
//   user: 'default',
//   password: 'GNAKucSoHy02',
//   database: 'verceldb',
//   ssl: {
//     rejectUnauthorized: false // Optional, depending on SSL configuration
//   },
//   connectTimeout: 100000
// };

//TODO:
//Demo
// const config = {
//   name: 'SecurityService',
//   connector: 'postgresql',
//   url: "postgres://default:fxvUOdk43aZN@ep-small-night-a4vd4038.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
//   host: 'ep-small-night-a4vd4038.us-east-1.aws.neon.tech',
//   port: 5432,
//   user: 'default',
//   password: 'fxvUOdk43aZN',
//   database: 'verceldb',
//   ssl: {
//     rejectUnauthorized: false // Optional, depending on SSL configuration
//   },
//   connectTimeout: 100000
// };

//msql pro
const config = {
  name: 'SecurityService',
  connector: 'mysql',
  url: '',
  host: 'localhost',
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export const configDatasouce = config
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class SecurityServiceDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'SecurityService';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.SecurityService', { optional: true })
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
