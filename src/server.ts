import { ApolloServer } from 'apollo-server';
import { apolloServerSentryPlugin } from './utils/sentry';
import { context } from './context';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

export const server = new ApolloServer({
    context,
    plugins: [apolloServerSentryPlugin],
    resolvers,
    typeDefs,
});
