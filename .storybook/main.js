/** @type { import('@storybook/react-webpack5').StorybookConfig } */
const path = require('path');

const config = {
    stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/preview-api',
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-actions',
        '@storybook/addon-backgrounds',
        '@storybook/addon-docs',
        '@storybook/addon-interactions',
        '@storybook/manager-api',
    ],
    framework: {
        name: '@storybook/react-webpack5',
        options: {},
    },
    staticDirs: ['../public'],
    webpackFinal: async (config) => {
        config.module.rules.push({
            test: /\.(js|jsx)$/,
            use: ['babel-loader'],
            exclude: /node_modules/,
        });
        return config;
    },
};
export default config;
