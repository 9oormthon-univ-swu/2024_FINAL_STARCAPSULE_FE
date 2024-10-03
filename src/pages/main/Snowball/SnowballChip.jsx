import { styled, Stack } from '@mui/material';
import React from 'react';

const SnowballChipContainer = styled(Stack)(() => ({
    backgroundColor: '#FFFFFF1A',
    borderRadius: '1.5rem',
    padding: '0.125rem 0.5rem',
    minWidth: 'fit-content',
}));

const ChipText = styled('p')(({ theme }) => ({
    color: theme.palette.custom.white,
    textAlign: 'center',
    fontFamily: 'Noto Sans',
    fontSize: '0.75rem',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: '1.25rem',
    minWidth: 0,
}));

const SnowballChip = ({ current, total, sx }) => {
    return (
        <SnowballChipContainer
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={sx}
        >
            <ChipText>{`${current} / ${total}`}</ChipText>
        </SnowballChipContainer>
    );
};

export default SnowballChip;
