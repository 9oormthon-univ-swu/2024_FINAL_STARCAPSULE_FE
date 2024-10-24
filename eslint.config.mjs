import globals from 'globals';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginStorybook from 'eslint-plugin-storybook';
import pluginJs from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

// mimic CommonJS variables -- not needed if using CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize FlatCompat to use the `extends` feature for legacy configurations
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: pluginJs.configs.recommended,
});

export default [
    {
        // Language options (ES2021, globals for browser and Node)
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: globals.browser,
            ecmaFeatures: {
                jsx: true,
            },
        },
        plugins: {
            react: pluginReactConfig,
            'jsx-a11y': pluginJsxA11y,
            'react-hooks': pluginReactHooks,
            storybook: pluginStorybook,
        },
        // Settings for React version detection
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            // Custom rules from the `.eslintrc.js` file
            'react/prop-types': 'off',
            'react/react-in-jsx-scope': 'off',
            'react/index': 'off',
            'comma-dangle': ['error', 'never'],
        },
    },
    // Include legacy configs using FlatCompat
    ...compat.extends(
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:react-hooks/recommended',
        'plugin:storybook/recommended'
    ),
];
