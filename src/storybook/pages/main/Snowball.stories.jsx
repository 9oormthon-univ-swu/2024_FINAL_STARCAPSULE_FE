import Snowball from '@/pages/main/Snowball/Snowball';
import { Box } from '@mui/material';
import React from 'react';

const meta = {
    title: 'main/Snowball',
    component: Snowball,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <Box sx={{ maxWidth: '600px', width: '100%' }}>
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
        received: {
            description: '받은 추억 수',
            control: {
                type: 'number',
            },
        },
        self: {
            description: '자신의 추억 수',
            control: {
                type: 'number',
            },
        },
        memories: {
            description: '추억 목록',
            control: {
                type: 'object',
            },
        },
    },
};

// 기본 스토리 설정
const Default = {
    args: {
        current: 1,
        total: 1,
        received: 1,
        self: 1,
        memories: [
            { id: 1, writer_name: '닉네임', object_name: 'snowman' },
            {
                id: 2,
                writer_name: '닉네임',
                object_name: 'snowman',
            },
            {
                id: 3,
                writer_name: '닉네임',
                object_name: 'moon',
            },
            {
                id: 4,
                writer_name: '닉네임',
                object_name: 'santa',
            },
            { id: 5, writer_name: '닉네임', object_name: 'snowflake' },
            {
                id: 6,
                writer_name: '닉네임',
                object_name: 'santa_sleigh',
            },
        ],
    },
};

export default meta;
export { Default };
