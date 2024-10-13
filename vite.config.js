import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import jsconfigPaths from 'vite-jsconfig-paths';
import path from 'path';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), jsconfigPaths(), svgr()],
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
