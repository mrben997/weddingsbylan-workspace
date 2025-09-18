import { Getter, inject } from '@loopback/core';
import { DefaultCrudRepository, HasOneRepositoryFactory, repository } from '@loopback/repository';
import { AppUser, AppUserCredentials, AppUserRelations } from '../models';
import { AppUserCredentialsRepository } from './app-user-credentials.repository';
import { SecurityServiceDataSource } from '../datasources';

export class AppUserRepository extends DefaultCrudRepository<
  AppUser,
  typeof AppUser.prototype.id,
  AppUserRelations
> {
  protected userCredentialsRepositoryGetter: Getter<AppUserCredentialsRepository>;
  readonly userCredentials: HasOneRepositoryFactory<AppUserCredentials, typeof AppUser.prototype.id>;

  constructor(
    @inject('datasources.SecurityService') dataSource: SecurityServiceDataSource,
    @repository.getter('UserCredentialsRepository')
    protected getUserCredentialsRepository: Getter<AppUserCredentialsRepository>,
  ) {
    super(AppUser, dataSource);
    this.userCredentials = this.createHasOneRepositoryFactoryFor(
      'userCredentials',
      getUserCredentialsRepository,
    );
    this.registerInclusionResolver(
      'userCredentials',
      this.userCredentials.inclusionResolver,
    );
  }

  async findCredentials(userId: typeof AppUser.prototype.id): Promise<AppUserCredentials | undefined> {
    return this.userCredentials(userId).get();
  }
}