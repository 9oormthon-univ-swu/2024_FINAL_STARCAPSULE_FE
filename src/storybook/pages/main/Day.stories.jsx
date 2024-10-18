import Day from '@/pages/main/Calendar/Day';
import dayjs from 'dayjs';

const meta = {
    title: 'main/Day',
    component: Day,
    tags: ['autodocs'],
    argTypes: {
        time: { control: 'text', description: '서버 시간' },
        hasWritten: {
            control: 'boolean',
            description: '작성 여부',
        },
        date: {
            control: 'number',
            description: '오늘 날짜, 0일 경우 11월 30일로 처리',
        },
    },
};

const today = dayjs('2024-12-01').format('YYYY-MM-DD');
const november30th = dayjs('2024-11-30').format('YYYY-MM-DD');
const styleConfig = {
    boxStyle: {
        position: 'absolute',
        width: '58px',
        height: '66px',
        flexShrink: 0,
    },
    variant: 'number1',
    position: 'middle',
};

export const TodayNotWritten = () => (
    <Day time={today} hasWritten={false} date={1} styleConfig={styleConfig} />
);

export const TodayWritten = () => (
    <Day time={today} hasWritten={true} date={1} styleConfig={styleConfig} />
);

export const Future = () => (
    <Day
        time={november30th}
        hasWritten={false}
        date={1}
        styleConfig={styleConfig}
    />
);

export const PastNotWritten = () => (
    <Day
        time={dayjs(today).add(2, 'day').toISOString()}
        hasWritten={false}
        date={1}
        styleConfig={styleConfig}
    />
);

export const PastWritten = () => (
    <Day
        time={dayjs(today).add(2, 'day').toISOString()}
        hasWritten={true}
        date={1}
        styleConfig={styleConfig}
    />
);

export const AfterEventNotWritten = () => (
    <Day
        time={dayjs('2025-02-25').toISOString()}
        hasWritten={false}
        date={1}
        styleConfig={styleConfig}
    />
);

export const AfterEventWritten = () => (
    <Day
        time={dayjs('2025-02-25').toISOString()}
        hasWritten={true}
        date={1}
        styleConfig={styleConfig}
    />
);

export const MiddleAligned = () => (
    <Day
        time={today}
        hasWritten={false}
        date={1}
        styleConfig={{ ...styleConfig, position: 'middle' }}
    />
);

export const RightAligned = () => (
    <Day
        time={today}
        hasWritten={false}
        date={1}
        styleConfig={{ ...styleConfig, position: 'right', variant: 'number2' }}
    />
);

export default meta;
