// Core
import excludeNodeModules from 'webpack-node-externals';

// Presets
import { entry, build } from './paths';

// Instruments
import merge from 'webpack-merge';
import { createBundledAnalyzer, createEnvVariables } from './modules';

export default merge(
    {
        mode:   'production',
        entry,
        target: 'node',
        output: {
            path:     build,
            filename: 'index.js',
        },
        externals: [ excludeNodeModules() ],
        module:    {
            rules: [
                {
                    test:    /\.(js)$/,
                    exclude: /node_modules/,
                    loader:  'babel-loader',
                },
            ],
        },
    },
    createBundledAnalyzer(),
    process.env.NODE_ENV === 'production' && createEnvVariables(),
);
