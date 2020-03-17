// Plugins
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { DefinePlugin } from 'webpack';

export const createBundledAnalyzer = () => ({
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode:      'disabled',
            generateStatsFile: true,
            statsFilename:     'build-stats.json',
            openAnalyzer:      false,
        }),
    ],
});

export const createEnvVariables = () => ({
    plugins: [
        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }),
    ],
});
