export const imagesSchema  = {
    type:       'object',
    properties: {
        test: {
            type: '',
        },
    },
    required:             [ '' ],
    additionalProperties: false,
};

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

