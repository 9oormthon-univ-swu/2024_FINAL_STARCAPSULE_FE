import React from 'react';
import SnowballImage from '@/assets/snowball_image.svg';
import { styled } from '@mui/material';
import { EditIcon } from '@/components/icons';

const SnowballContainer = styled('div')(({ theme }) => ({
    color: theme.palette.custom.white,
    backgroundImage: `url(${SnowballImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    aspectRatio: '5/6',
}));

const Snowball = () => {
    return (
        <SnowballContainer>
            <EditIcon sx={{ color: 'custom.white' }} />
        </SnowballContainer>
    );
};

export default Snowball;
