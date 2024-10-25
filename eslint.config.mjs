import globals from 'globals';
import pluginJs from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

// CommonJS 환경 변수 정의
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// FlatCompat 초기화
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: pluginJs.configs.recommended,
});

export default [
    {
        // 언어 옵션 설정
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
            ecmaFeatures: {
                jsx: true,
            },
        },
        // React 버전 자동 감지
        settings: {
            react: {
                version: 'detect',
            },
        },
        // 사용자 정의 규칙
        rules: {
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'comma-dangle': ['error', 'never'],
        },
    },
    // 레거시 구성 확장
    ...compat.extends(
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:react-hooks/recommended',
        'plugin:storybook/recommended'
    ),
];
