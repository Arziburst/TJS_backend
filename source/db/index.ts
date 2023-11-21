// Core
import { connect, ConnectOptions } from 'mongoose';
import dg from 'debug';

// Instruments
import { getDbUrl } from '../helpers';

const debug = dg('db');
const DB_URL = getDbUrl();

const mongooseOptions: ConnectOptions = {
    // promiseLibrary:   global.Promise, // Error
    // poolSize:           10, // >v6 minPoolSize / maxPoolSize
    maxPoolSize:      10,
    keepAlive:        true,
    connectTimeoutMS: 5000,
    // useNewUrlParser:  true, // >v6 by default true
    // useFindAndModify:   false, // >>v6 by default false
    // useCreateIndex:     true, // >v6 by default true
    // useUnifiedTopology: true, // >v6 by default true
};

const connection = connect(DB_URL, mongooseOptions);

connection
    .then(() => {
        debug('DB TJstore connected');
    })
    .catch(({ message }) => {
        debug(`DB TJstore connectionError: ${message}`);
    });
