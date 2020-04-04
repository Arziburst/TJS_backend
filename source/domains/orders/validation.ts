export const editOrderSchema = {
    type: 'object',
    properties: {
        status: {
            type: ['string', 'number'],
        },
    },
    required: ['status'],
    additionalProperties: false,
};

export const orderSchema = {
    type: 'object',
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
    required: ['phone', 'orderedProducts'],
    additionalProperties: false,
};

// export const isProduct = (Product: object): Product is Product => {
//     if (typeof Product !== 'object') {
//         return false;
//     }

//     return (
//         typeof (Product as Product).id === 'string'
//         && typeof (Product as Product).email === 'string'
//         && typeof (Product as Product).fname === 'string'
//         && typeof (Product as Product).lname === 'string'
//     );
// };