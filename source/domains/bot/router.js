// Core
import express from 'express';

// Handlers
import * as methods from './';

const route = express.Router();

route.get('/', methods.sayHello);

export { route as bot };
