import Calendar from '@/pages/main/Calendar/Calendar';

const meta = {
    title: 'main/Calendar',
    component: Calendar,
    argTypes: {
        serverTime: {
            control: 'date',
        },
        hasWritten: {
            control: 'array',
        },
    },
};

export default meta;

const allWritten = {
    serverTime: '2024-12-31',
    hasWritten: Array(32).fill(true).fill(false, 31),
};
const noWritten = {
    serverTime: '2024-12-31',
    hasWritten: Array(32).fill(false),
};
const someWritten = {
    serverTime: '2024-12-31',
    hasWritten: Array(32).fill(false).fill(true, 15, 20),
};

const firstDay = {
    serverTime: '2024-11-30',
    hasWritten: Array(32).fill(false),
};

const lastDayWritten = {
    serverTime: '2024-12-31',
    hasWritten: Array(32).fill(true),
};

const FirstDay = {
    args: firstDay,
};
const AllWritten = {
    args: allWritten,
};
const NoWritten = {
    args: noWritten,
};
const SomeWritten = {
    args: someWritten,
};

const LastDayWritten = {
    args: lastDayWritten,
};

export { FirstDay, AllWritten, NoWritten, SomeWritten, LastDayWritten };
