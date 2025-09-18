import { UserCredentials, UserCredentialsRelations } from '@loopback/authentication-jwt';
import { model } from '@loopback/repository';

@model()
export class AppUserCredentials extends UserCredentials {

  constructor(data?: Partial<AppUserCredentials>) {
    super(data);
  }
}

export interface AppUserCredentialsRelations extends UserCredentialsRelations {
  // describe navigational properties here
}

export type AppUserCredentialsWithRelations = AppUserCredentials & AppUserCredentialsRelations;