import React from 'react';
import { ThemeProvider } from '@mui/material';
import theme from '../src/constants/theme';
import '../src/App.css';
import '../src/index.css';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'; // utc 플러그인
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/ko';

const addResetCSS = () => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/reset-css@4.0.1/reset.min.css';
    document.head.appendChild(link);
};

addResetCSS();

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
    (Story) => {
        dayjs.extend(utc);
        dayjs.extend(timezone);
        dayjs.tz.setDefault('Asia/Seoul');
        dayjs.locale('ko');

        return (
            <ThemeProvider theme={theme}>
                <Story />
            </ThemeProvider>
        );
    },
];

export default preview;
