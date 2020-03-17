export default {
    type:       'object',
    properties: {
        orderedProducts: {
            type: 'array',
        },
        phone: {
            type: 'string',
        },
        comment: {
            type: 'string',
        },
    },
    required:             [ 'phone', 'orderedProducts' ],
    additionalProperties: false,
};
