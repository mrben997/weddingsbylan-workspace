import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import { RepositoryMixin } from '@loopback/repository';
import { RestApplication } from '@loopback/rest';
import { ServiceMixin } from '@loopback/service-proxy';
import path from 'path';
import { MySequence } from './sequence';
import { AuthenticationComponent } from '@loopback/authentication';
import { JWTAuthenticationComponent, RefreshTokenServiceBindings, TokenServiceBindings, UserServiceBindings } from '@loopback/authentication-jwt';
import { SecurityServiceDataSource } from './datasources';
import { AppUserService } from './services/app-user.service';
import { AppUserCredentialsRepository, AppUserRepository } from './repositories';
import { InitialPublic, OrderRandom, PathStore } from './helper';


//Initial
OrderRandom()
InitialPublic()
export { ApplicationConfig };

export class ServerApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);
    // Set up a global base path
    // const basePath = '/api';
    // this.basePath(basePath);
    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    // this.static('/', path.join(__dirname, '../public'));
    this.static('/', path.join(__dirname, "." + PathStore.PathPublic));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);
    // Mount authentication system
    this.component(AuthenticationComponent);
    // Mount jwt component
    this.component(JWTAuthenticationComponent);
    this.dataSource(SecurityServiceDataSource, UserServiceBindings.DATASOURCE_NAME);

    // Bind user service
    this.bind(UserServiceBindings.USER_SERVICE).toClass(AppUserService);
    // Bind user and credentials repository
    this.bind(UserServiceBindings.USER_REPOSITORY).toClass(
      AppUserRepository,
    );
    this.bind(UserServiceBindings.USER_CREDENTIALS_REPOSITORY).toClass(
      AppUserCredentialsRepository,
    )
    this.bind(RefreshTokenServiceBindings.REFRESH_REPOSITORY).toClass(
      AppUserCredentialsRepository,
    )


    // for jwt access token expiration
    this.bind(TokenServiceBindings.TOKEN_EXPIRES_IN).to("300"); //second - 5m
    // for refresh token expiration
    this.bind(RefreshTokenServiceBindings.REFRESH_EXPIRES_IN).to("31622400"); //second - 1y

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
