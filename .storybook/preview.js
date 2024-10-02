import React from 'react';
import { ThemeProvider } from '@mui/material';
import theme from '../src/constants/theme';
import '../src/App.css';
import '../src/index.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export const decorators = [
    (Story) => (
        <ThemeProvider theme={theme}>
            <Story />
        </ThemeProvider>
    ),
];

export default preview;
