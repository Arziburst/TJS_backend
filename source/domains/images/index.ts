// Core
import express from 'express';

// Handlers
import * as methods from './handlers';

// Helpers
import { authenticate, checkRole } from '../../middlewares';

const route = express.Router();

route.get('/images', [ authenticate, checkRole('admin') ],  methods.getAll);
route.post('/images', [ authenticate, checkRole('admin') ] , methods.postMany);
route.delete('/images/:public_id', [ authenticate, checkRole('admin') ], methods.deleteOne);

export { route as images };
