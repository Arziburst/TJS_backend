// Core
import express from 'express';

// Handlers
import * as handlers from './handlers';

// Helpers
import { authenticate, userSelfCRUD, checkRole } from '../../middlewares';

const route = express.Router();

route.get('/users', [ authenticate, checkRole('admin') ], handlers.getAll);
route.post('/users', handlers.postOne); // TODO body validation
route.get('/users/:_id', [ authenticate, userSelfCRUD ], handlers.getOne);
route.put('/users/:_id', [ authenticate, userSelfCRUD ], handlers.putOne); // TODO body validation
route.delete('/users/:_id', [ authenticate, userSelfCRUD ], handlers.deleteOne);

export { route as users };
