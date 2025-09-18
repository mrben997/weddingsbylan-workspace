import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SecurityServiceDataSource} from '../datasources';
import {Recruitment, RecruitmentRelations} from '../models';

export class RecruitmentRepository extends DefaultCrudRepository<
  Recruitment,
  typeof Recruitment.prototype.Id,
  RecruitmentRelations
> {
  constructor(
    @inject('datasources.SecurityService') dataSource: SecurityServiceDataSource,
  ) {
    super(Recruitment, dataSource);
  }
}
