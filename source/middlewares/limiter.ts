import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

type limiterType = (numRequest: number, resetIn: number) => RateLimitRequestHandler;

export const limiter: limiterType = (numRequest, resetIn) => rateLimit({
    windowMs: resetIn,
    max:      numRequest,
    headers:  false,
});
