const { CracoAliasPlugin } = require('react-app-alias');

module.exports = {
    plugins: [
        {
            plugin: CracoAliasPlugin,
            options: {
                source: 'jsconfig',
                baseUrl: './src',
                tsConfigPath: './jsconfig.paths.json', // 위에서 작성한 tsconfig.paths.json입니다.
            },
        },
    ],
};
