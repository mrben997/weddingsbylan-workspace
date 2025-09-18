import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SecurityServiceDataSource} from '../datasources';
import {AppUserCredentials, AppUserCredentialsRelations} from '../models';

export class AppUserCredentialsRepository extends DefaultCrudRepository<
  AppUserCredentials,
  typeof AppUserCredentials.prototype.id,
  AppUserCredentialsRelations
> {
  constructor(
    @inject('datasources.SecurityService') dataSource: SecurityServiceDataSource,
  ) {
    super(AppUserCredentials, dataSource);
  }
}
