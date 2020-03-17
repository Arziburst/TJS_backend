export default {
    type:       'object',
    properties: {
        status: {
            type: [ 'string', 'number' ],
        },
    },
    required:             [ 'status' ],
    additionalProperties: false,
};
