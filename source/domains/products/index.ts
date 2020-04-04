// Core
import express from 'express';

// Handlers
import * as methods from './handlers';

// Helpers
import { authenticate, checkRole } from '../../middlewares';

const route = express.Router();

route.get('/products', methods.getAll);
route.post('/products', [ authenticate, checkRole('admin') ], methods.postOne);
route.put('/products/:_id', [ authenticate, checkRole('admin') ], methods.putOne);
route.delete('/products/:_id', [ authenticate, checkRole('admin') ], methods.deleteOne);
route.post('/products/incrementViews/:_id', methods.incrementProductViews);

export { route as products };
