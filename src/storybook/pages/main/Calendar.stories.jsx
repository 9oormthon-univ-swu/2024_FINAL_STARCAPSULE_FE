import Calendar from '@/pages/calendar/Calendar';

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
        year: {
            control: 'number',
        },
    },
};

export default meta;

const allWritten = {
    serverTime: '2024-12-31',
    hasWritten: Array(32).fill(true).fill(false, 31),
    year: 2024,
};
const noWritten = {
    serverTime: '2024-12-31',
    hasWritten: Array(32).fill(false),
    year: 2024,
};
const someWritten = {
    serverTime: '2024-12-31',
    hasWritten: Array(32).fill(false).fill(true, 15, 20),
    year: 2024,
};

const firstDay = {
    serverTime: '2024-11-30',
    hasWritten: Array(32).fill(false),
    year: 2024,
};

const lastDayWritten = {
    serverTime: '2024-12-31',
    hasWritten: Array(32).fill(true),
    year: 2024,
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

export { FirstDay, AllWritten, NoWritten, SomeWritten };
