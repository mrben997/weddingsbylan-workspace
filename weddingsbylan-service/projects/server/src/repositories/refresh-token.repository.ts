import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { SecurityServiceDataSource } from '../datasources';
import { AppRefreshToken, RefreshTokenRelations } from '../models';

export class RefreshTokenRepository extends DefaultCrudRepository<
  AppRefreshToken,
  typeof AppRefreshToken.prototype.id,
  RefreshTokenRelations
> {
  constructor(
    @inject('datasources.SecurityService') dataSource: SecurityServiceDataSource,
  ) {
    super(AppRefreshToken, dataSource);
  }
}
