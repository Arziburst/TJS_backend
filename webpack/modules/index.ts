// Plugins
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { DefinePlugin, Configuration } from 'webpack';

export const createBundledAnalyzer = (): Configuration => ({
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode:      'disabled',
            generateStatsFile: true,
            statsFilename:     'build-stats.json',
            openAnalyzer:      false,
        }),
    ],
});

export const createEnvVariables = (): Configuration => ({
    plugins: [
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ],
});
