export const orderSchema = {
    type:       'object',
    properties: {
        orderedPIDs: {
            type: 'array',
        },
        firstName: {
            type: 'string',
        },
        lastName: {
            type: 'string',
        },
        phone: {
            type: 'string',
        },
        email: {
            type: 'string',
        },
        city: {
            type: 'string',
        },
        warehouse: {
            type: 'string',
        },
    },
    required:             [ 'orderedPIDs', 'phone' ],
    additionalProperties: true,
};

export const editOrderSchema = {
    type:       'object',
    properties: {
        firstName: {
            type: 'string',
        },
        lastName: {
            type: 'string',
        },
        phone: {
            type: 'string',
        },
        email: {
            type: 'string',
        },
        city: {
            type: 'string',
        },
        warehouse: {
            type: 'string',
        },
        comment: {
            type: 'string',
        },
        status: {
            type: 'number',
        },
    },
    // required:             [ 'status' ],
    additionalProperties: false,
};
