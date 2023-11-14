// Core
import express from 'express';

// Handlers
import * as methods from './handlers';

const route = express.Router();

route.put('/cart/check', methods.check);

export { route as cart };
