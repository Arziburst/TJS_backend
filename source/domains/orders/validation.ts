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
    required:             [ 'orderedPIDs' ],
    additionalProperties: false,
};

export const liqPaySchema = {
    type:       'object',
    properties: {
        amount: {
            type: 'number',
        },
        description: {
            type: 'string',
        },
        order_id: {
            type: 'string',
        },
        result_url: {
            type: 'string',
        },
        server_url: {
            type: 'string',
        },
    },
    required: [
        'amount',
        'description',
        'order_id',
        'result_url',
    ],
    additionalProperties: false,
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
