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
        styleConfig: {
            control: 'object',
            description: '스타일 설정',
        },
        lastDayWritten: {
            control: 'boolean',
            description: '마지막 날 작성 여부',
        },
        recordable: {
            control: 'boolean',
            description: '기록 가능 여부',
        },
        year: {
            control: 'number',
            description: '년도',
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
    <Day
        time={today}
        hasWritten={false}
        date={1}
        styleConfig={styleConfig}
        recordable={true}
        year={2024}
    />
);

export const TodayWritten = () => (
    <Day
        time={today}
        hasWritten={true}
        date={1}
        styleConfig={styleConfig}
        recordable={true}
        year={2024}
    />
);

export const Future = () => (
    <Day
        time={november30th}
        hasWritten={false}
        date={1}
        styleConfig={styleConfig}
        recordable={true}
        year={2024}
    />
);

export const PastNotWritten = () => (
    <Day
        time={dayjs(today).add(2, 'day').toISOString()}
        hasWritten={false}
        date={1}
        styleConfig={styleConfig}
        recordable={true}
        year={2024}
    />
);

export const PastWritten = () => (
    <Day
        time={dayjs(today).add(2, 'day').toISOString()}
        hasWritten={true}
        date={1}
        styleConfig={styleConfig}
        recordable={true}
        year={2024}
    />
);

export const AfterEventNotWritten = () => (
    <Day
        time={dayjs('2025-02-25').toISOString()}
        hasWritten={false}
        date={1}
        styleConfig={styleConfig}
        recordable={false}
        year={2024}
    />
);

export const AfterEventWritten = () => (
    <Day
        time={dayjs('2025-02-25').toISOString()}
        hasWritten={true}
        date={1}
        styleConfig={styleConfig}
        recordable={false}
        year={2024}
    />
);

export const MiddleAligned = () => (
    <Day
        time={today}
        hasWritten={false}
        date={1}
        styleConfig={{ ...styleConfig, position: 'middle' }}
        recordable={true}
        year={2024}
    />
);

export const RightAligned = () => (
    <Day
        time={today}
        hasWritten={false}
        date={1}
        styleConfig={{ ...styleConfig, position: 'right', variant: 'number2' }}
        recordable={true}
        year={2024}
    />
);

export default meta;
