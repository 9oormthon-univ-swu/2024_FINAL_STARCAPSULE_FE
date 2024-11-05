import React from 'react';
import {
    CalendarIcon,
    CheckIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    EditIcon,
    ImageIcon,
    ShareIcon,
} from '@/components/icons';

const meta = {
    title: 'components/Icons',
    argTypes: {
        sx: {
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
            mapping: {
                'custom.main1': { color: 'custom.main1' },
                'custom.main2': { color: 'custom.main2' },
                'custom.button1': { color: 'custom.button1' },
                'custom.button2': { color: 'custom.button2' },
                'custom.font': { color: 'custom.font' },
                'custom.grey': { color: 'custom.grey' },
                'custom.white': { color: 'custom.white' },
            },
        },
    },
    tags: ['autodocs'],
};

// 공통 템플릿
const Template = (args) => <args.component {...args} />;

export const Calendar = Template.bind({});
Calendar.args = {
    component: CalendarIcon,
    sx: { color: 'custom.font' },
};

export const Check = Template.bind({});
Check.args = {
    component: CheckIcon,
    sx: { color: 'custom.font' },
};

export const ChevronLeft = Template.bind({});
ChevronLeft.args = {
    component: ChevronLeftIcon,
    sx: { color: 'custom.font' },
};

export const ChevronRight = Template.bind({});
ChevronRight.args = {
    component: ChevronRightIcon,
    sx: { color: 'custom.font' },
};

export const Edit = Template.bind({});
Edit.args = {
    component: EditIcon,
    sx: { color: 'custom.font' },
};

export const Image = Template.bind({});
Image.args = {
    component: ImageIcon,
    sx: { color: 'custom.font' },
};

export const Share = Template.bind({});
Share.args = {
    component: ShareIcon,
    sx: { color: 'custom.font' },
};

export default meta;
