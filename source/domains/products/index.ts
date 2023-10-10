// Core
import express from 'express';

// Handlers
import * as methods from './handlers';

// Helpers
import { authenticate, checkRole, validator } from '../../middlewares';

// Validation
import { productSchema } from './validation';

const route = express.Router();

route.get('/products', methods.getAll);
route.get('/products-pagination/:type', methods.getAllByPagination);
route.post('/products', [ authenticate, checkRole('admin'), validator(productSchema) ], methods.postOne);
route.put('/products/:_id', [ authenticate, checkRole('admin'), validator(productSchema) ], methods.putOne);
route.delete('/products/:_id', [ authenticate, checkRole('admin') ], methods.deleteOne);
route.post('/products/incrementViews/:_id', methods.incrementProductViews);

export { route as products };
