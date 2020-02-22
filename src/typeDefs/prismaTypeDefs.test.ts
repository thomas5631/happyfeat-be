import { gql } from 'apollo-server';
import { isTypeDefinitionNode } from 'graphql';
import { removeRootTypeDefs } from './prismaTypeDefs';

describe('removeRootTypeDefs', () => {
    describe.each`
        type
        ${'Query'}
        ${'Mutation'}
        ${'Subscription'}
    `('$type', ({ type }) => {
        const typeDefsWithQuery = gql`
            type ${type} {
                test(where: InputType!): ReturnType!
            }

            type ReturnType {
                field: Boolean!
            }

            input InputType {
                field: Boolean!
            }
        `;

        it(`removes the ${type} type`, () => {
            expect(
                removeRootTypeDefs(typeDefsWithQuery).definitions.find(
                    definition => isTypeDefinitionNode(definition) && definition.name.value === type,
                ),
            ).toEqual(undefined);
        });

        it('preserves other types', () => {
            expect(
                removeRootTypeDefs(typeDefsWithQuery).definitions.find(
                    definition => isTypeDefinitionNode(definition) && definition.name.value === 'ReturnType',
                ),
            ).toBeDefined();
            expect(
                removeRootTypeDefs(typeDefsWithQuery).definitions.find(
                    definition => isTypeDefinitionNode(definition) && definition.name.value === 'InputType',
                ),
            ).toBeDefined();
        });
    });
});
