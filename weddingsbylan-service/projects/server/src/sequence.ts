import { DefaultSequence, FindRoute, InvokeMethod, InvokeMiddleware, InvokeMiddlewareOptions, MiddlewareSequence, ParseParams, Reject, RequestContext, Send, SequenceActions, SequenceHandler } from '@loopback/rest';
// ---------- ADD IMPORTS -------------
import { AuthenticateFn, AuthenticationBindings } from '@loopback/authentication';
import { config, inject } from '@loopback/core';

// ------------------------------------
export class MySequence extends DefaultSequence implements SequenceHandler {
    constructor(
        @inject(SequenceActions.FIND_ROUTE) protected findRoute: FindRoute,
        @inject(SequenceActions.PARSE_PARAMS) protected parseParams: ParseParams,
        @inject(SequenceActions.INVOKE_METHOD) protected invoke: InvokeMethod,
        @inject(SequenceActions.SEND) public send: Send,
        @inject(SequenceActions.REJECT) public reject: Reject,
        // ---- ADD THIS LINE ------
        @inject(AuthenticationBindings.AUTH_ACTION)
        protected authenticateRequest: AuthenticateFn,
        @inject(SequenceActions.INVOKE_MIDDLEWARE)
        readonly invokeMiddleware: InvokeMiddleware,
        @config()
        readonly options: InvokeMiddlewareOptions = MiddlewareSequence.defaultOptions,
    ) {

        super(findRoute, parseParams, invoke, send, reject)
    }
    async handle(context: RequestContext) {

        await this.invokeMiddleware(context, this.options);
        // await super.handle(context)
        // try {
        //   const {request, response} = context;

        //   const route = this.findRoute(request);
        //   // - enable jwt auth -
        //   // call authentication action
        //   // ---------- ADD THIS LINE -------------
        //   // await this.authenticateRequest(request);
        //   const args = await this.parseParams(request, route);
        //   const result = await this.invoke(route, args);
        //   this.send(response, result);

        // } catch (err) {
        //   // ---------- ADD THIS SNIPPET -------------
        //   // if error is coming from the JWT authentication extension
        //   // make the statusCode 401
        //   if (
        //     err.code === AUTHENTICATION_STRATEGY_NOT_FOUND ||
        //     err.code === USER_PROFILE_NOT_FOUND
        //   ) {
        //     Object.assign(err, {statusCode: 401 /* Unauthorized */});
        //   }
        //   // ---------- END OF SNIPPET -------------
        //   this.reject(context, err);
        // }
    }
}