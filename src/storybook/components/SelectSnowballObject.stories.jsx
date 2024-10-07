import SelectSnowballObject from '@/components/SelectSnowballObject';
import React from 'react';
import { useState } from '@storybook/preview-api';
import { ObjectNames } from '@/constants/ObjectNames';

const meta = {
    title: 'components/SelectSnowballObject',
    tags: ['autodocs'],
    component: SelectSnowballObject,
};

const Mine = {
    args: {
        mine: true,
    },
    render: function Render(args) {
        const [snowballObject, setSnowballObject] = useState(
            ObjectNames.CHRISTMAS_TREE
        );
        return (
            <SelectSnowballObject
                {...args}
                snowballObject={snowballObject}
                setSnowballObject={setSnowballObject}
            />
        );
    },
};
const Friends = {
    args: {
        mine: false,
    },
    render: function Render(args) {
        const [snowballObject, setSnowballObject] = useState(
            ObjectNames.SNOWFLAKE
        );
        return (
            <SelectSnowballObject
                {...args}
                snowballObject={snowballObject}
                setSnowballObject={setSnowballObject}
            />
        );
    },
};

export default meta;
export { Mine, Friends };
