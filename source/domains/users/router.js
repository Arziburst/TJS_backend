// Core
import express from 'express';

// Handlers
import * as users from './';
import * as user from './user';

// Helpers
import { authenticate, userSelfCRUD, checkRole, validator } from '../../helpers';

// Instruments
import userSchema from './_schemas/userSchema';

const route = express.Router();

route.get('/', [authenticate, checkRole('admin') ], users.get);
route.post('/', [validator(userSchema) ], users.post);

route.get('/:hash', [ authenticate, userSelfCRUD ], user.get);
route.put('/:hash', [ authenticate, userSelfCRUD ], [ validator(userSchema) ], user.put);
route.delete('/:hash', [ authenticate, userSelfCRUD ], user.remove);

export { route as users };
