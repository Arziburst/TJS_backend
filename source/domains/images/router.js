// Core
import express from 'express';

// Handlers
import * as methods from '.';

// Helpers
import { authenticate, checkRole } from '../../helpers';

const route = express.Router();

route.get('/', [ authenticate, checkRole('admin') ], methods.get);
route.post('/', [ authenticate, checkRole('admin') ], methods.post);
route.delete('/:public_id', [ authenticate, checkRole('admin') ], methods.remove);

export { route as images };
