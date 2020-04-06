// Core
import express from 'express';

// Handlers
import * as methods from './handlers';

const route = express.Router();

route.get('/bot', methods.sayHello);

export { route as bot };
