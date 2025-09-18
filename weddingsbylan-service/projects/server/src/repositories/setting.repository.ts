import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SecurityServiceDataSource} from '../datasources';
import {Setting, SettingRelations} from '../models';

export class SettingRepository extends DefaultCrudRepository<
  Setting,
  typeof Setting.prototype.Id,
  SettingRelations
> {
  constructor(
    @inject('datasources.SecurityService') dataSource: SecurityServiceDataSource,
  ) {
    super(Setting, dataSource);
  }
}
