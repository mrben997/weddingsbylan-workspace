import { User, UserRelations } from '@loopback/authentication-jwt';
import { hasOne, model } from '@loopback/repository';
import { AppUserCredentials } from './app-user-credentials.model';
@model()
export class AppUser extends User {
  constructor(data?: Partial<AppUser>) {
    super(data);
  }
}

export interface AppUserRelations extends UserRelations {
  // describe navigational properties here
}

export type AppUserWithRelations = AppUser & AppUserRelations;