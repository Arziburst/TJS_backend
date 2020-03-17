// Core
import dg from 'debug';

// Instruments
import { Users } from '../../../controllers';

const debug = dg('router:users:hash');

export const get = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const user = new Users(req.params.hash);
        const data = await user.findOne();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const put = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const reqData = {
            hash: req.params.hash,
            body: req.body,
        };
        const user = new Users(reqData);
        const data = await user.findOneAndUpdate();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const remove = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const user = new Users(req.params.hash);
        await user.findOneAndRemove();

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
