// Core
import express from 'express';

// Handlers
import * as handlers from './handlers';

// Helpers
import { authenticate, checkRole, validator } from '../../middlewares';

// Validation
import { orderSchema, editOrderSchema} from './validation';

const route = express.Router();

route.get('/orders/', [ authenticate ], handlers.getAll);
route.post('/orders/', [ validator(orderSchema) ], handlers.postOne);
route.put('/orders/:_id', [ authenticate, checkRole('admin'), validator(editOrderSchema) ], handlers.putOne);
route.delete('/orders/:_id', [ authenticate, checkRole('admin') ], handlers.deleteOne);

export { route as orders };
