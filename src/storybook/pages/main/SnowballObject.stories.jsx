import React from 'react';
import SnowballObject from '@/pages/main/Snowball/SnowballObject';

const meta = {
    title: 'main/SnowballObject',
    component: SnowballObject,
    tags: ['autodocs'],
    argTypes: {
        writer: {
            control: 'text',
        },
        variant: {
            control: { type: 'select' },
            options: [
                'christmas_tree',
                'gingerbread_house',
                'lamplight',
                'moon',
                'santa_sleigh',
                'santa',
                'snowman',
                'snowflake',
            ],
        },
        black: {
            control: 'boolean',
        },
    },
};

const NicknameShortKR = {
    args: {
        writer: '김수한무',
        variant: 'santa',
        sx: { color: 'white' },
    },
};

const NicknameLongKR = {
    args: {
        writer: '김수한무거북이와두루미',
        variant: 'santa',
        sx: { color: 'white' },
    },
};

const ChristmasTree = {
    args: {
        writer: 'Christmas Tree',
        variant: 'christmas_tree',
        sx: { color: 'white' },
    },
};

const GingerbreadHouse = {
    args: {
        writer: 'Gingerbread House',
        variant: 'gingerbread_house',
        sx: { color: 'white' },
    },
};

const Lamplight = {
    args: {
        writer: 'Lamplight',
        variant: 'lamplight',
        sx: { color: 'white' },
    },
};

const Moon = {
    args: {
        writer: 'Moon',
        variant: 'moon',
        sx: { color: 'white' },
    },
};

const SantaSleigh = {
    args: {
        writer: 'Santa Sleigh',
        variant: 'santa_sleigh',
        sx: { color: 'white' },
    },
};

const Santa = {
    args: {
        writer: 'Santa',
        variant: 'santa',
        sx: { color: 'white' },
    },
};

const Snowman = {
    args: {
        writer: 'Snowman',
        variant: 'snowman',
        sx: { color: 'white' },
    },
};

const Snowflake = {
    args: {
        writer: 'Snowflake',
        variant: 'snowflake',
        sx: { color: 'white' },
    },
};

export default meta;

export {
    NicknameShortKR,
    NicknameLongKR,
    ChristmasTree,
    GingerbreadHouse,
    Lamplight,
    Moon,
    SantaSleigh,
    Santa,
    Snowman,
    Snowflake,
};
