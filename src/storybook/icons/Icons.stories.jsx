import React from 'react';
import { CalendarIcon, ShareIcon } from '@/components/icons';

const meta = {
    title: 'Icons',
    argTypes: {
        color: {
            control: { type: 'select' },
            options: [
                'custom.main1',
                'custom.main2',
                'custom.button1',
                'custom.button2',
                'custom.font',
                'custom.grey',
                'custom.white',
            ],
        },
    },
    tags: ['autodocs'],
};

// 공통 템플릿
const Template = (args) => <args.component {...args} />;

export const Calendar = Template.bind({});
Calendar.args = {
    component: CalendarIcon,
    color: 'custom.main1',
};

export const Share = Template.bind({});
Share.args = {
    component: ShareIcon,
    color: 'custom.main1',
};

export default meta;
