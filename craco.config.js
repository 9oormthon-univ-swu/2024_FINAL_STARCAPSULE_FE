const { CracoAliasPlugin } = require('react-app-alias');

module.exports = {
    plugins: [
        {
            plugin: CracoAliasPlugin,
            options: {
                source: 'jsconfig', // JavaScript에서는 jsconfig 사용
                baseUrl: './src',
                jsConfigPath: './jsconfig.json', // jsconfig.json을 참조
            },
        },
    ],
};
