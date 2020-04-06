export const orderSchema = {
    type:       'object',
    properties: {
        orderedPIDs: {
            type: 'array',
        },
        phone: {
            type: 'string',
        },
        comment: {
            type: 'string',
        },
    },
    required:             [ 'phone', 'orderedPIDs' ],
    additionalProperties: false,
};

export const editOrderSchema = {
    type:       'object',
    properties: {
        status: {
            type: 'number',
        },
    },
    required:             [ 'status' ],
    additionalProperties: false,
};
