// Core
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';
import cors from 'cors';
import bodyParser from 'body-parser';
import formData from 'express-form-data';
import cloudinary from 'cloudinary';
import dg from 'debug';

// Routes
import * as domains from './domains';

// Instruments
import { requireJsonContent, getPassword, NotFoundError, getCloudinaryEnv } from './helpers';

// Initialize DB connection
import './db';

const app = express();

const debug = dg('server:init');
const MongoStore = connectMongo(session);

const { 
    CLOUD_NAME,
    API_KEY,
    API_SECRET
} = getCloudinaryEnv();

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
});

const ttl = process.env.NODE_ENV === 'development'
    ? 8 * 60 * 60 * 1000
    : 1000 * 60 * 60 * 24 * 7;

const sessionOptions = {
    name:              'user',
    secret:            getPassword(),
    resave:            false,
    rolling:           true,
    saveUninitialized: false,
    store:             new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl,
    }),
    cookie: {
        httpOnly: true,
        secure:   false,
        maxAge:   ttl,
    },
};

app.disable('x-powered-by');
app.use(cors({ credentials: true, origin: process.env.ROOT_URL }));
app.use(formData.parse())
app.use(bodyParser.json());
app.set('trust proxy', 1);
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

app.use('/api/profile', domains.profile);
app.use('/api/users', domains.users);
app.use('/api/products', domains.products);
app.use('/api/orders', domains.orders);
app.use('/api/bot', domains.bot);
app.use('/api/images', domains.images);
app.get('/api/ping', (req, res) => {
    res.sendStatus(204);
});

app.use('*', (req, res, next) => {
    const error = new NotFoundError(
        `Can not find right route for method ${req.method} and path ${req.originalUrl}`,
        404,
    );
    next(error);
});

app.use((error, req, res, next) => {
    const { name, message, statusCode } = error;
    const errorMessage = `${name}: ${message}`;

    debug(`Error: ${errorMessage}`);

    const status = statusCode || 500;
    res.status(status).json({ message: message });
});

export { app };
