import { RewriteFrames } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';
import env from 'env-var';

Sentry.init({
    enabled: env.get('SENTRY_ENABLED').asBool(),
    environment: env.get('SENTRY_ENVIRONMENT').asString(),
    dsn: env.get('SENTRY_DSN').asString(),
    integrations: [
        new RewriteFrames({
            root: process.cwd(),
        }),
    ],
});

export const apolloServerSentryPlugin: ApolloServerPlugin = {
    requestDidStart() {
        return {
            didEncounterErrors(rc) {
                Sentry.withScope(scope => {
                    scope.addEventProcessor(event => Sentry.Handlers.parseRequest(event, rc.context.req));

                    const userId = rc.context.user?.sub;
                    if (userId) {
                        scope.setUser({
                            id: userId,
                            ip_address: rc.context.req?.ip,
                        });
                    }

                    scope.setTags({
                        graphql: rc.operation?.operation || 'parse_err',
                        graphqlName: rc.operationName || rc.request.operationName || 'unknown',
                    });

                    rc.errors.forEach(error => {
                        if (error.path || error.name !== 'GraphQLError') {
                            scope.setExtras({
                                path: error.path,
                            });
                            Sentry.captureException(error);
                        } else {
                            scope.setExtras({});
                            Sentry.captureMessage(`GraphQLWrongQuery: ${error.message}`);
                        }
                    });
                });
            },
        };
    },
};
