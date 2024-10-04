import { styled, Stack } from '@mui/material';
import React from 'react';

const SnowballChipContainer = styled(Stack)(() => ({
    backgroundColor: '#FFFFFF1A',
    borderRadius: '1.5rem',
    padding: 'clamp(0.125rem, 0.5vw, 0.25rem) clamp(0.5rem, 2vw, 1rem)',
    width: 'fit-content',
    position: 'absolute',
    top: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
}));

const ChipText = styled('p')(({ theme }) => ({
    color: theme.palette.custom.white,
    textAlign: 'center',
    fontFamily: 'Noto Sans',
    fontSize: 'clamp(0.75rem, 4vw, 1.5rem)',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '1.25rem',
    minWidth: 0,
}));

const SnowballChip = ({ current, total }) => {
    return (
        <SnowballChipContainer
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
        >
            <ChipText>{`${current} / ${total}`}</ChipText>
        </SnowballChipContainer>
    );
};

export default SnowballChip;
