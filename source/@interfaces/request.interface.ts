import { Request } from 'express';
import { User } from '../@types/user.type';

export interface IRequestWithUser extends Request {
    user: User;
}
