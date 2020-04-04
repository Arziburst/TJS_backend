// Core
import express from 'express';

// Instruments
import { limiter } from '../../middlewares';

// Handlers
import * as methods from './handlers';

// Helpers
import { authenticate } from '../../middlewares';

const timeout = 5 * 60 * 1000; // 5 min

const route = express.Router();

route.get('/profile/refresh', methods.authorization);
route.post('/profile/registration', [ limiter(15, timeout) ], methods.registration);
route.post('/profile/login', [ limiter(15, timeout) ], methods.login);
route.delete('/profile/logout', [ authenticate, limiter(15, timeout) ], methods.logout);

export { route as profile };
