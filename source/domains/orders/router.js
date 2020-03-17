// Core
import express from 'express';

// Handlers
import * as orders from './';
import * as order from './order';

// Helpers
import { authenticate, checkRole, validator } from '../../helpers';

// Instruments
import orderSchema from './_schemas/orderSchema';
import editOrderSchema from './_schemas/editOrderSchema';

const route = express.Router();

route.get('/', [ authenticate ], orders.get);
route.post('/', [ validator(orderSchema) ], orders.post);
route.get('/:hash', [ authenticate ], order.get);
route.put('/:hash', [ authenticate, validator(editOrderSchema) ], order.put);
route.delete('/:hash', [ authenticate, checkRole('admin') ], order.remove);

export { route as orders };
