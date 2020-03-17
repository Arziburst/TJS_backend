export default {
    type:       'object',
    properties: {
        name: {
            type:      'string',
            minLength: 2,
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
    required:             [ 'email', 'phone', 'password' ],
    additionalProperties: false,
};
