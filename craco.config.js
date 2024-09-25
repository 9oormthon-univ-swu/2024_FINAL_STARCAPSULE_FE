const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@page': path.resolve(__dirname, 'src/page'),
            '@layout': path.resolve(__dirname, 'src/layout'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@storybook': path.resolve(__dirname, 'src/storybook'),
        },
    },
    babel: {
        presets: ['@babel/preset-react'],
    },
};
