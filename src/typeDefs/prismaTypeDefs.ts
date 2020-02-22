import { gql } from 'apollo-server';
import { isTypeDefinitionNode, DocumentNode } from 'graphql';
import { typeDefs } from '../generated/prisma-client/prisma-schema';

export const removeRootTypeDefs = (typeDefsWithRoots: string | DocumentNode): DocumentNode => {
    const typesToRemove = ['Query', 'Mutation', 'Subscription'];

    const inputTypeDefs = gql`
        ${typeDefsWithRoots}
    `;

    const definitions = inputTypeDefs.definitions.filter(
        definition =>
            !isTypeDefinitionNode(definition) ||
            (isTypeDefinitionNode(definition) && !typesToRemove.includes(definition.name.value)),
    );

    return {
        ...inputTypeDefs,
        definitions,
    };
};

export const prismaTypeDefs = removeRootTypeDefs(typeDefs);
