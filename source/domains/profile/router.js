// Core
import express from 'express';

// Instruments
import { limiter } from '../../helpers';

// Handlers
import * as methods from './';
const timeout = 5 * 60 * 1000; // 5 min

const route = express.Router();

route.get('/refresh', methods.authorization);
route.post('/registration', [ limiter(15, timeout) ], methods.registration);
route.post('/login', [ limiter(15, timeout) ], methods.login);
route.delete('/logout', [ limiter(15, timeout) ], methods.logout);

export { route as profile };
