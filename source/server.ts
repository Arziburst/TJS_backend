// Core
import express, {
    Request,
    Response,
    NextFunction,
    Application,
} from 'express';
import session from 'express-session';
import helmet from 'helmet';
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
import { 
    requireJsonContent, getPassword, getCloudinaryEnv,
    NotFoundError, ValidationError,
 } from './helpers';

// Initialize DB connection
import './db';

const app: Application = express();

const debug = dg('server:init');
const MongoStore = connectMongo(session);

const {
    CLOUD_NAME,
    API_KEY,
    API_SECRET,
} = getCloudinaryEnv();

type Cloud = {
    cloud_name: string;
    api_key: string;
    api_secret: string;
}

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key:    API_KEY,
    api_secret: API_SECRET,
});

const ttl = 1000 * 60 * 60 * 24 * 7;

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
app.use(helmet());
app.use(cors({ credentials: true, origin: process.env.ROOT_URL }));
app.use(formData.parse());
app.use(
    bodyParser.json({
        limit: '10kb',
    }),
);
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
