// Core
import mongoose from 'mongoose';
import dg from 'debug';

// Instruments
import { getDbUrl } from '../helpers';

const debug = dg('db');
const DB_URL = getDbUrl();

const mongooseOptions = {
    promiseLibrary:     global.Promise,
    poolSize:           10,
    keepAlive:          30000,
    connectTimeoutMS:   5000,
    useNewUrlParser:    true,
    useFindAndModify:   false,
    useCreateIndex:     true,
    useUnifiedTopology: true,
};

const connection = mongoose.connect(DB_URL, mongooseOptions);

connection
    .then(() => {
        debug('DB TJstore connected');
    })
    .catch(({ message }) => {
        debug(`DB TJstore connectionError: ${message}`);
    });
