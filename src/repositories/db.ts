import { Prisma } from 'prisma-binding';
import env from 'env-var';
import { typeDefs } from '../generated/prisma-client/prisma-schema';

export const db = new Prisma({
    typeDefs,
    endpoint: `${env
        .get('PRISMA_ENDPOINT')
        .required()
        .asUrlString()}/${env
        .get('PRISMA_DATABASE')
        .required()
        .asString()}/${env
        .get('PRISMA_STAGE')
        .required()
        .asString()}`,
    secret: env
        .get('PRISMA_MANAGEMENT_API_SECRET')
        .required()
        .asString(),
});
