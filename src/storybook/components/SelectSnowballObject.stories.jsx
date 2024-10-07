import SelectSnowballObject from '@/components/SelectSnowballObject';
import React, { useState } from 'react';

const meta = {
    title: 'components/SelectSnowballObject',
    tags: ['autodocs'],
    components: SelectSnowballObject,
    decorators: [
        (Story) => {
            const [snowballObject, setSnowballObject] = useState('');
            return (
                <Story
                    snowballObject={snowballObject}
                    setSnowballObject={setSnowballObject}
                />
            );
        },
    ],
};

const Default = {};

export default meta;
export { Default };
