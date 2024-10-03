import React from 'react';
import SnowballImage from '@/assets/snowball_image.svg';
import { styled } from '@mui/material';
import SnowballChip from './SnowballChip';

const SnowballContainer = styled('div')(({ theme }) => ({
    color: theme.palette.custom.white,
    backgroundImage: `url(${SnowballImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    aspectRatio: '5/6',
    position: 'relative',
}));

const Snowball = ({ current, total }) => {
    return (
        <SnowballContainer>
            <SnowballChip
                current={current}
                total={total}
                sx={{
                    position: 'absolute',
                    top: '1rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                }}
            />
        </SnowballContainer>
    );
};

export default Snowball;
