// Core
import dg from 'debug';

// Instruments
import { Orders } from '../../../controllers';

const debug = dg('router:orders:hash');

export const get = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const order = new Orders(req.params.hash);
        const data = await order.findOne();

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
        const order = new Orders(reqData);
        const data = await order.findOneAndUpdate();

        res.status(200).json({ data });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const remove = async (req, res) => {
    debug(`${req.method} — ${req.originalUrl}`);

    try {
        const order = new Orders(req.params.hash);
        await order.findOneAndRemove();

        res.sendStatus(204);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
