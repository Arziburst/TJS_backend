// Core
import dg from 'debug';

// Instruments
import { Users } from '../../controllers';

const debug = dg('router:auth');

export const authorization = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        if (!req.session.user) {
            throw new Error('session expired');
        }

        const foundedUser = new Users(req.session.user.hash);
        const profile = await foundedUser.findOne();

        res.status(200).json({ data: profile });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        if (!req.headers.authorization) {
            throw new Error('credentials are not valid');
        }

        const [ , credentials ] = req.headers.authorization.split(' ');
        const [ email, password ] = credentials

        // Buffer.from(credentials, 'base64')
        // .toString()
            .split(':');

        const users = new Users({ email, password });
        const hash = await users.login();

        const foundedUser = new Users(hash);
        const profile = await foundedUser.findOne();

        req.session.user = { hash };
        res.status(200).json({ data: profile });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

export const registration = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const newUser = new Users(req.body);
        const { hash } = await newUser.register();
        const foundedUser = new Users(hash);
        const profile = await foundedUser.findOne();

        req.session.user = { hash };
        res.status(200).json({ data: profile });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        if (!req.session.user) {
            throw new Error('session expired');
        }

        if (req.session.user) {
            req.session.destroy((err) => {
                if (err) { throw err; }
                res.clearCookie('user');
                res.status(204).json({ data: 'ok' });
            });
        } else {
            throw new Error('Something went wrong');
        }
    } catch (error) {
        res.status(422).json({ message: error.message });
    }
};
