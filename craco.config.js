const { CracoAliasPlugin } = require('react-app-alias');
const path = require('path');

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
    webpack: {
        resolve: {
            fallback: {
                http: require.resolve('stream-http'),
                https: require.resolve('https-browserify'),
                zlib: require.resolve('browserify-zlib'),
                stream: require.resolve('stream-browserify'),
            },
            alias: {
                '@': path.resolve(__dirname, 'src'),
                '@/components': path.resolve(__dirname, 'src/components'),
                '@/storybook': path.resolve(__dirname, 'src/storybook'),
                '@/utils': path.resolve(__dirname, 'src/utils'),
                '@/hooks': path.resolve(__dirname, 'src/hooks'),
                '@/page': path.resolve(__dirname, 'src/page'),
                '@/layout': path.resolve(__dirname, 'src/layout'),
                '@/constants': path.resolve(__dirname, 'src/constants'),
            },
            extensions: ['.js', '.jsx'], // 확장자 생략 가능하게 설정
        },
    },
};
