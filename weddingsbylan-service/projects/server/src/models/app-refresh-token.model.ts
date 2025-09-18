import { RefreshToken } from '@loopback/authentication-jwt';
import { model, } from '@loopback/repository';

@model()
export class AppRefreshToken extends RefreshToken {
}

export interface RefreshTokenRelations {
    // describe navigational properties here
}

export type RefreshTokenWithRelations = RefreshToken & RefreshTokenRelations;
