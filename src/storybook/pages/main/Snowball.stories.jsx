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
            type: {
                Array: {
                    id: { type: 'number' },
                    writer_name: { type: 'string' },
                    object_name: { type: 'string' },
                },
            },
        },
        onLeftClick: {
            description: '왼쪽 버튼 클릭 이벤트',
            action: 'clicked',
        },
        onRightClick: {
            description: '오른쪽 버튼 클릭 이벤트',
            action: 'clicked',
        },
    },
};

const memories = [
    { id: 1, writer_name: '닉네임', object_name: 'snowman' },
    { id: 2, writer_name: '닉네임', object_name: 'snowman' },
    { id: 3, writer_name: '닉네임', object_name: 'moon' },
    { id: 4, writer_name: '닉네임', object_name: 'santa' },
    { id: 5, writer_name: '닉네임', object_name: 'snowflake' },
    { id: 6, writer_name: '닉네임', object_name: 'santa_sleigh' },
];

// 기본 스토리 설정
const Default = {
    args: {
        current: 1,
        total: 1,
        received: 1,
        self: 1,
        memories: memories,
        onLeftClick: () => window.alert('left'),
        onRightClick: () => window.alert('right'),
    },
};

const FirstPage = {
    args: {
        current: 1,
        total: 6,
        received: 1,
        self: 1,
        memories: memories,
        onLeftClick: () => window.alert('left'),
        onRightClick: () => window.alert('right'),
    },
};

const MiddlePage = {
    args: {
        current: 3,
        total: 6,
        received: 1,
        self: 1,
        memories: memories,
        onLeftClick: () => window.alert('left'),
        onRightClick: () => window.alert('right'),
    },
};

const LastPage = {
    args: {
        current: 6,
        total: 6,
        received: 1,
        self: 1,
        memories: memories,
        onLeftClick: () => window.alert('left'),
        onRightClick: () => window.alert('right'),
    },
};

export default meta;
export { Default, FirstPage, MiddlePage, LastPage };
