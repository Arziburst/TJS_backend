export const requireJsonContent = (req, res, next) => {
    if (req.method === 'GET') {
        return next();
    }

    const contentType = req.headers[ 'content-type' ];

    if (contentType !== 'application/json' && !/multipart/gm.test(contentType)) {
        return res
            .status(400)
            .send(
                `Server requires content-type header equal to application/json or multipart/form-data but received ${contentType}`,
            );
    }

    next();
};
