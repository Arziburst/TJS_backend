// Core
import webpack from 'webpack';
import excludeNodeModules from 'webpack-node-externals';
import chalk from 'chalk'; // Console Coloring

// Presets
import { entry, build } from './paths';

// Instruments
import merge from 'webpack-merge';
import { createBundledAnalyzer } from './modules';

const config = merge(
    {
        mode:   'production',
        entry,
        target: 'node',
        output: {
            path:     build,
            filename: 'index.js',
        },
        resolve: {
            extensions: [ '.ts' ],
        },
        externals: [ excludeNodeModules() ],
        module:    {
            rules: [
                {
                    test:    /\.ts$/,
                    include: /source/,
                    exclude: /node_modules/,
                    loader:  'ts-loader',
                },
            ],
        },
    },
    createBundledAnalyzer(),
);

const compiler = webpack(config);

compiler.run((error, stats) => {
    if (error) {
        // ошибка конфигурации
        console.error(error.stack || error);

        if (error.message) {
            console.error(error.message);
        }

        return null;
    }

    const info = stats?.toString({
        colors:     true,
        hash:       true,
        version:    true,
        timings:    true,
        env:        true,
        chunks:     false,
        modules:    false,
        children:   false,
        publicPath: true,
        reasons:    true,
        source:     false,
    });

    console.log(chalk.greenBright('✓ Build completed'));
    console.log(info);

    if (stats?.hasErrors()) {
        // ошибка во время компиляции (битый импорт, ошибка синтаксиса, etc)
        console.log(chalk.redBright('→ Error!'));
        console.error(info);
    }

    if (stats?.hasWarnings()) {
        // ворнинг во время компиляции
        console.log(chalk.yellowBright('→ Warning!'));
        console.warn(info);
    }
});
