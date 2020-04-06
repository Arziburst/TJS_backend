import rateLimit from 'express-rate-limit';

type limiterType = (numRequest: number, resetIn: number) => rateLimit.RateLimit;

export const limiter: limiterType = (numRequest, resetIn) => rateLimit({
    windowMs: resetIn,
    max:      numRequest,
    headers:  false,
});
