import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import jsconfigPaths from 'vite-jsconfig-paths';
import path from 'path';
import svgr from 'vite-plugin-svgr';
import eslintPlugin from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        jsconfigPaths(),
        svgr(),
        eslintPlugin(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'robots.txt'],
            manifest: {
                name: '스노로그',
                short_name: 'SNOWLOG',
                description: '오늘의 질문에 답변해보세요!',
                theme_color: '#132034',
                icons: [
                    {
                        src: 'ios/192.png',
                        sizes: '192x192',
                        type: 'image/png',
                    },
                    {
                        src: 'ios/512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                ],
            },
            devOptions: {
                enabled: true,
            },
        }),
    ],
    server: {
        port: 3000,
        open: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'), // 절대 경로를 수동으로 설정
        },
    },
    build: {
        sourcemap: true, // 소스 맵을 사용하여 디버깅을 쉽게
    },
});
