import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SecurityServiceDataSource} from '../datasources';
import {Service, ServiceRelations} from '../models';

export class ServiceRepository extends DefaultCrudRepository<
  Service,
  typeof Service.prototype.Id,
  ServiceRelations
> {
  constructor(
    @inject('datasources.SecurityService') dataSource: SecurityServiceDataSource,
  ) {
    super(Service, dataSource);
  }
}
