import Day from '@/pages/main/Calendar/Day';
import { typography } from 'storybook/internal/theming';

const meta = {
    title: 'main/Day',
    component: Day,
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

const NotWritten = {
    args: {
        time: '2024-01-30T00:00:00',
        hasWritten: false,
        date: 0,
        styleConfig: {
            boxStyle: {
                width: '58px',
                height: '51px',
            },
            variant: 'number2',
            position: 'middle',
        },
    },
};

const Written = {
    args: {
        time: '2024-01-30T00:00:00',
        hasWritten: true,
        date: 0,
        styleConfig: {
            boxStyle: {
                width: '58px',
                height: '51px',
            },
            variant: 'number1',
            position: 'right',
        },
    },
};

const Future = {
    args: {
        time: '2025-12-01T00:00:00',
        hasWritten: false,
        date: 1,
        styleConfig: {
            boxStyle: {
                width: '58px',
                height: '51px',
            },
            variant: 'number1',
            position: 'right',
        },
    },
};

export default meta;
export { NotWritten, Written, Future };
