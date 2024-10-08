import React from 'react';
import { SnowballObjects } from '@/constants/SnowballObjects';
import default_snowball from '@/assets/object_background/default_snowball.svg';
import selected_snowball from '@/assets/object_background/selected_snowball.svg';
import { styled } from '@mui/material';

const ObjectInSnowball = ({ variant, selected }) => {
    console.log('variant:', variant);
    console.log('selected:', selected);
    const Snowball = styled('div')(() => ({
        width: '4rem',
        height: '5rem',
        background: `url(${selected ? selected_snowball : default_snowball}) no-repeat center center`,
        boxSizing: 'border-box',
        padding: '0.5rem 0.5rem 1.5rem 0.5rem',
    }));

    return (
        <Snowball>
            <img
                src={SnowballObjects[variant]}
                alt={variant}
                style={{
                    width: '3rem',
                    height: '3rem',
                }}
            />
        </Snowball>
    );
};

export default ObjectInSnowball;
