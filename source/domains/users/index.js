// Core
import dg from 'debug';

// Instruments
import { Users } from '../../controllers';

const debug = dg('router:users');

export const get = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const users = new Users();
        const data = await users.find();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const post = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const newUser = new Users(req.body);
        const { hash } = await newUser.register();

        res.status(201).json({ data: hash });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
