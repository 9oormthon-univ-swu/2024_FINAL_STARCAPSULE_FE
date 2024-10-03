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
    },
};

const NicknameShortKR = {
    args: {
        writer: '김수한무',
        variant: 'santa',
    },
};

const NicknameLongKR = {
    args: {
        writer: '김수한무거북이와두루미',
        variant: 'santa',
    },
};

const ChristmasTree = {
    args: {
        writer: 'Christmas Tree',
        variant: 'christmas_tree',
    },
};

const GingerbreadHouse = {
    args: {
        writer: 'Gingerbread House',
        variant: 'gingerbread_house',
    },
};

const Lamplight = {
    args: {
        writer: 'Lamplight',
        variant: 'lamplight',
    },
};

const Moon = {
    args: {
        writer: 'Moon',
        variant: 'moon',
    },
};

const SantaSleigh = {
    args: {
        writer: 'Santa Sleigh',
        variant: 'santa_sleigh',
    },
};

const Santa = {
    args: {
        writer: 'Santa',
        variant: 'santa',
    },
};

const Snowman = {
    args: {
        writer: 'Snowman',
        variant: 'snowman',
    },
};

const Snowflake = {
    args: {
        writer: 'Snowflake',
        variant: 'snowflake',
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
