// Core
import express from 'express';

// Handlers
import * as handlers from './handlers';

// Helpers
import { authenticate, checkRole } from '../../middlewares';

const route = express.Router();

route.get('/orders/', [ authenticate ], handlers.getAll);
route.post('/orders/', handlers.postOne); // TODO: validate body
route.put('/orders/:_id', [authenticate, checkRole('admin')], handlers.putOne); // TODO: validate body
route.delete('/orders/:_id', [authenticate, checkRole('admin')], handlers.deleteOne);

export { route as orders };
