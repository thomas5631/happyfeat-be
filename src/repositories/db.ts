import { Prisma } from 'prisma-binding';
import env from 'env-var';
import { typeDefs } from '../generated/prisma-client/prisma-schema';

export const db = new Prisma({
    typeDefs,
    endpoint: env
        .get('PRISMA_ENDPOINT')
        .required()
        .asUrlString(),
    secret: env
        .get('PRISMA_MANAGEMENT_API_SECRET')
        .required()
        .asString(),
});
