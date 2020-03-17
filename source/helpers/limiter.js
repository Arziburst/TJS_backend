import rateLimit from 'express-rate-limit';

export const limiter = (numRequest, resetIn) => rateLimit({
    windowMs: resetIn,
    max:      numRequest,
    headers:  false,
});
