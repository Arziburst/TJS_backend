// Core
import express from 'express';

// Handlers
import * as products from './';
import * as product from './product';

// Helpers
import { authenticate, checkRole, validator } from '../../helpers';

// Instruments
import productSchema from './_schemas/productSchema';

const route = express.Router();

route.get('/', products.get);
route.post('/', [ authenticate, checkRole('admin'), validator(productSchema) ], products.post);
route.get('/:hash', product.get);
route.put('/:hash', [ authenticate, checkRole('admin'), validator(productSchema) ], product.put);
route.delete('/:hash', [ authenticate, checkRole('admin') ],  product.remove);
route.post('/incrementViews/:hash', product.incrementViews);

export { route as products };
