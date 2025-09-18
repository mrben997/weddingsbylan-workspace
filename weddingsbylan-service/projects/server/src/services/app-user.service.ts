import { UserService } from '@loopback/authentication';
import { Credentials } from '@loopback/authentication-jwt';
import { /* inject, */ BindingScope, injectable } from '@loopback/core';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { UserProfile, securityId } from '@loopback/security';
import { compare } from 'bcryptjs';
import { AppUser } from '../models';
import { AppUserRepository } from '../repositories';

@injectable({ scope: BindingScope.TRANSIENT })
export class AppUserService implements UserService<AppUser, Credentials> {
    constructor(
        // UserRepository --> MyUserRepository
        @repository(AppUserRepository) public userRepository: AppUserRepository,
    ) { }

    // User --> MyUser
    async verifyCredentials(credentials: Credentials): Promise<AppUser> {
        const invalidCredentialsError = 'Invalid email or password.';

        const foundUser = await this.userRepository.findOne({
            where: { email: credentials.email },
        });
        if (!foundUser) {
            throw new HttpErrors.Unauthorized(invalidCredentialsError);
        }

        const credentialsFound = await this.userRepository.findCredentials(
            foundUser.id,
        );
        if (!credentialsFound) {
            throw new HttpErrors.Unauthorized(invalidCredentialsError);
        }

        const passwordMatched = await compare(
            credentials.password,
            credentialsFound.password,
        );

        if (!passwordMatched) {
            throw new HttpErrors.Unauthorized(invalidCredentialsError);
        }

        return foundUser;
    }

    // User --> MyUser
    convertToUserProfile(user: AppUser): UserProfile {
        return {
            [securityId]: user.id.toString(),
            name: user.username,
            id: user.id,
            email: user.email,
        };
    }
    async findUserById(id: string) {
        const userNotfound = 'invalid User';
        const foundUser = await this.userRepository.findOne({
            where: { id: id },
        });
        if (!foundUser) {
            throw new HttpErrors.Unauthorized(userNotfound);
        }
        return foundUser;
    }
}