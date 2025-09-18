// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/core';
import { TokenService, authenticate } from '@loopback/authentication';
import {
    Credentials,
    RefreshTokenService,
    RefreshTokenServiceBindings,
    TokenObject,
    TokenServiceBindings,
    UserServiceBindings,
} from '@loopback/authentication-jwt';
import { inject } from '@loopback/core';
import { model, property, repository } from '@loopback/repository';
import { HttpErrors, SchemaObject, get, getModelSchemaRef, post, requestBody } from '@loopback/rest';
import { SecurityBindings, UserProfile, securityId } from '@loopback/security';
import { genSalt, hash } from 'bcryptjs';
import _ from 'lodash';
import { AppUser } from '../models';
import { AppUserRepository, RefreshTokenRepository } from '../repositories';
import { AppUserService } from '../services/app-user.service';
import { randomBytes } from 'crypto';
// Describes the type of grant object taken in by method "refresh"
type RefreshGrant = {
    refreshToken: string;
};

// Describes the schema of grant object
const RefreshGrantSchema: SchemaObject = {
    type: 'object',
    required: ['refreshToken'],
    properties: {
        refreshToken: {
            type: 'string',
        },
    },
};

// Describes the request body of grant object
const RefreshGrantRequestBody = {
    description: 'Reissuing Acess Token',
    required: true,
    content: {
        'application/json': { schema: RefreshGrantSchema },
    },
};
@model()
export class NewUserRequest extends AppUser {
    @property({
        type: 'string',
        required: true,
    })
    password: string;
}

const CredentialsSchema: SchemaObject = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: {
            type: 'string',
            format: 'email',
        },
        password: {
            type: 'string',
            minLength: 8,
        },
    },
};
@model()
export class ChangePasswordRequest {
    @property({
        type: 'string',
        required: true,
    })
    oldPassword: string;

    @property({
        type: 'string',
        required: true,
        minLength: 8,
    })
    newPassword: string;

    @property({
        type: 'string',
        required: true,
    })
    confirmPassword: string;
}
const ChangePasswordRequestBody = {
    description: 'The input of change password function',
    required: true,
    content: {
        'application/json': { schema: getModelSchemaRef(ChangePasswordRequest) },
    },
};

export const CredentialsRequestBody = {
    description: 'The input of login function',
    required: true,
    content: {
        'application/json': { schema: CredentialsSchema },
    },
};

export class UserController {
    constructor(
        @inject(TokenServiceBindings.TOKEN_SERVICE)
        public jwtService: TokenService,
        @inject(UserServiceBindings.USER_SERVICE)
        public userService: AppUserService,
        @inject(SecurityBindings.USER, { optional: true })
        public user: UserProfile,
        @repository(AppUserRepository) protected userRepository: AppUserRepository,
        @repository(RefreshTokenRepository) protected refreshTokenRepository: RefreshTokenRepository, // Add this
        @inject(RefreshTokenServiceBindings.REFRESH_TOKEN_SERVICE)
        public refreshService: RefreshTokenService,
    ) { }

    @post('/users/v1/login', {
        responses: {
            '200': {
                description: 'Token',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                token: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
        },
    })
    async loginv1(
        @requestBody(CredentialsRequestBody) credentials: Credentials,
    ): Promise<{ token: string }> {
        // ensure the user exists, and the password is correct
        const user = await this.userService.verifyCredentials(credentials);
        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile = this.userService.convertToUserProfile(user);

        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile);
        return { token };
    }
    @post('/users/v2/login', {
        responses: {
            '200': {
                description: 'Token',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                accessToken: {
                                    type: 'string',
                                },
                                refreshToken: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
        },
    })
    async refreshLogin(
        @requestBody(CredentialsRequestBody) credentials: Credentials,
    ): Promise<TokenObject> {
        // ensure the user exists, and the password is correct
        const user = await this.userService.verifyCredentials(credentials);
        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile: UserProfile =
            this.userService.convertToUserProfile(user);
        const accessToken = await this.jwtService.generateToken(userProfile);
        const tokens = await this.refreshService.generateToken(
            userProfile,
            accessToken,
        );
        return tokens;
    }
    @authenticate('jwt')
    @get('/whoAmI', {
        responses: {
            '200': {
                description: 'Return current user',
                content: {
                    'application/json': {
                        schema: {
                            type: 'string',
                        },
                    },
                },
            },
        },
    })
    async whoAmI(
        @inject(SecurityBindings.USER)
        currentUserProfile: UserProfile,
    ): Promise<string> {
        return currentUserProfile[securityId];
    }
    @authenticate('jwt')
    @post('/users/change-password', {
        responses: {
            '204': {
                description: 'Password changed successfully',
            },
        },
    })

    async changePassword(
        @inject(SecurityBindings.USER) currentUserProfile: UserProfile,
        @requestBody(ChangePasswordRequestBody) request: ChangePasswordRequest,
    ): Promise<void> {
        const userId = currentUserProfile[securityId];
        const user = await this.userRepository.findById(userId);

        // Verify old password
        const credentials = { email: user.email, password: request.oldPassword };
        await this.userService.verifyCredentials(credentials);

        // Check if new password and confirm password match
        if (request.newPassword !== request.confirmPassword) {
            throw new HttpErrors.BadRequest('New password and confirmation do not match.');
        }

        // Hash new password and update user credentials
        const hashedNewPassword = await hash(request.newPassword, await genSalt());
        await this.userRepository.userCredentials(user.id).patch({ password: hashedNewPassword });

        // Optionally, return a response or status
    }
    @post('/users/signup', {
        responses: {
            '200': {
                description: 'User',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': AppUser,
                        },
                    },
                },
            },
        },
    })
    async signUp(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(NewUserRequest, {
                        title: 'NewUser',
                    }),
                },
            },
        })
        newUserRequest: NewUserRequest,
    ): Promise<AppUser> {
        const password = await hash(newUserRequest.password, await genSalt());
        const savedUser = await this.userRepository.create(
            _.omit(newUserRequest, 'password'),
        );

        await this.userRepository.userCredentials(savedUser.id).create({ password });

        return savedUser;
    }
    @post('/users/refresh-token', {
        responses: {
            '200': {
                description: 'Token',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                accessToken: {
                                    type: 'object',
                                },
                            },
                        },
                    },
                },
            },
        },
    })
    async refresh(
        @requestBody(RefreshGrantRequestBody) refreshGrant: RefreshGrant,
    ): Promise<TokenObject> {
        return this.refreshService.refreshToken(refreshGrant.refreshToken);
    }
}