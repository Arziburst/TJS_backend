export const registrationSchema = {
    type:       'object',
    properties: {
        name: {
            type: 'string',
        },
        email: {
            type: 'string',
        },
        phone: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
    },
    additionalProperties: false,
};
