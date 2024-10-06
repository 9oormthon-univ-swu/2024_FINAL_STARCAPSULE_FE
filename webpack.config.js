const path = require('path');

module.exports = {
    // 기존 webpack 설정이 여기에 있습니다
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i, // 이미지 파일을 처리하는 룰 추가
                type: 'asset/resource', // 파일을 별도 리소스로 처리
            },
        ],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // base URL을 src로 설정
            '@/components': path.resolve(__dirname, 'src/components'),
            '@/storybook': path.resolve(__dirname, 'src/storybook'),
            '@/utils': path.resolve(__dirname, 'src/utils'),
            '@/hooks': path.resolve(__dirname, 'src/hooks'),
            '@/page': path.resolve(__dirname, 'src/page'),
            '@/layout': path.resolve(__dirname, 'src/layout'),
            '@/constants': path.resolve(__dirname, 'src/constants'),
        },
        extensions: ['.js', '.jsx'], // 확장자 생략 가능하게 설정
        fallback: {
            http: require.resolve('stream-http'),
            https: require.resolve('https-browserify'),
            stream: require.resolve('stream-browserify'),
            zlib: require.resolve('browserify-zlib'),
        },
    },
};
