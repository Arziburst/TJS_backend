// Core
import express from 'express';

// Handlers
import * as handlers from './handlers';

// Helpers
import { authenticate, checkRole, validator } from '../../middlewares';

// Validation
import { orderSchema, editOrderSchema, liqPaySchema} from './validation';

const route = express.Router();

route.get('/orders/', [ authenticate ], handlers.getAll);
route.get('/orders/:_id', [ authenticate ], handlers.getOne);
route.post('/orders/change-status', handlers.changeStatus);
route.post('/orders/liq-pay', [ validator(liqPaySchema) ], handlers.getLiqPay);
route.post('/orders/', [ validator(orderSchema) ], handlers.postOne);
route.put('/orders/:_id', [ validator(editOrderSchema) ], handlers.putOne);
route.delete('/orders/:_id', handlers.deleteOne);

export { route as orders };
