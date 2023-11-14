// Core
import express, { Request, Response, NextFunction, Application } from 'express';
import session, { SessionOptions } from 'express-session';
import helmet from 'helmet';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import bodyParser from 'body-parser';
import formData from 'express-form-data';
import { v2 as cloudinary } from 'cloudinary';
import dg from 'debug';

// Routes
import { cart, products, images, users, bot, profile, orders } from './domains';

// Instruments
import { getPassword, getCloudinaryEnv, NotFoundError, ValidationError } from './helpers';
import { requireJsonContent } from './middlewares';

// Initialize DB connection
import './db';

const app: Application = express();
const debug = dg('server:init');

const {
    CLOUD_NAME,
    API_KEY,
    API_SECRET,
} = getCloudinaryEnv();

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key:    API_KEY,
    api_secret: API_SECRET,
});

const ttl = 1000 * 60 * 60 * 24 * 365;

const sessionOptions: SessionOptions = {
    name:              'user',
    secret:            getPassword(),
    resave:            false,
    rolling:           true,
    saveUninitialized: false,
    store:             MongoStore.create({
        mongoUrl: process.env.DB_URL,
        ttl,
    }),
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        maxAge:   ttl,
    },
};

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({
    credentials: true,
    origin:      [
        'http://localhost',
        'http://localhost:3000', // dev
        'http://localhost:3001', // dev
        'http://localhost:5000', // serve
        'http://192.168.99.100', // w10 docker
        'https://tjstore.pp.ua', // prod
        'https://www.liqpay.ua/api/request',
        'https://www.liqpay.ua/api/3/checkout',
    ],
}));
app.use(formData.parse());
app.use(bodyParser.json({ limit: '10kb' }));
app.use(session(sessionOptions));
app.use(requireJsonContent);

if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        const body = req.method === 'GET'
            ? 'Body not supported for GET'
            : JSON.stringify(req.body, null, 2);

        debug(`${req.method}\n${body}`);
        next();
    });
}

app.use([
    products,
    cart,
    profile,
    images,
    orders,
    users,
    bot,
]);
app.get('/ping', (req, res) => {
    res.sendStatus(204);
});

app.use('*', (req: Request, res: Response, next: NextFunction) => {
    const error = new NotFoundError(`Route not found ${req.method} — '${req.originalUrl}'`, 404);
    next(error);
});

app.use(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (error: ValidationError | NotFoundError, req: Request, res: Response, next: NextFunction) => {
        const { name, message, statusCode } = error;
        const errorMessage = `${name}: ${message}`;

        debug(`Error: ${errorMessage}`);

        const status = statusCode || 500;
        res.status(status).json({ message });
    },
);

export { app };
