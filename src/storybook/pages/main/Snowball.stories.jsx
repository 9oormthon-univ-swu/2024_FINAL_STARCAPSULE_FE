import Snowball from '@/pages/main/Snowball/Snowball';
import { Box } from '@mui/material';
import React from 'react';

const meta = {
    title: 'main/Snowball',
    component: Snowball,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <Box sx={{ width: '600px' }}>
                <Story />
            </Box>
        ),
    ],
    argTypes: {
        current: {
            description: '현재 페이지',
            control: {
                type: 'number',
            },
        },
        total: {
            description: '전체 페이지',
            control: {
                type: 'number',
            },
        },
    },
};

// 기본 스토리 설정
const Default = {
    args: {
        current: 1,
        total: 5,
    },
};

export default meta;
export { Default };
