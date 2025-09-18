import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SecurityServiceDataSource} from '../datasources';
import {News, NewsRelations} from '../models';

export class NewsRepository extends DefaultCrudRepository<
  News,
  typeof News.prototype.Id,
  NewsRelations
> {
  constructor(
    @inject('datasources.SecurityService') dataSource: SecurityServiceDataSource,
  ) {
    super(News, dataSource);
  }
}
