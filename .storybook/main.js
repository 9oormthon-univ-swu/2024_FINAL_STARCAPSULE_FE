const path = require('path');
const JsconfigPathsPlugin = require('jsconfig-paths-webpack-plugin');

module.exports = {
    stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-essentials',
        '@storybook/preset-create-react-app',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    staticDirs: ['../public'],
    webpackFinal: async (config) => {
        // Add Babel loader for JSX
        config.module.rules.push({
            test: /\.(js|jsx)$/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                    },
                },
            ],
            exclude: /node_modules/,
        });
        config.resolve.alias = {
            ...config.resolve?.alias,
            '@': path.resolve(__dirname, '../src'),
        };

        return config;
    },
};
