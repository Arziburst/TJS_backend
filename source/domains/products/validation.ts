export const productSchema = {
    type:       'object',
    properties: {
        title: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        type: {
            type: 'string',
        },
        price: {
            type: [ 'number', 'string' ],
        },
        discount: {
            type: [ 'number', 'string' ],
        },
        available: {
            type: 'boolean',
        },
        weight: {
            type: [ 'number', 'string' ],
        },
        images: {
            type: 'array',
        },
    },
    additionalProperties: false,
};
