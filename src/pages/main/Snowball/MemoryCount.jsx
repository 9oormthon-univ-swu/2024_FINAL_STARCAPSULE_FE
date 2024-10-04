import { styled } from '@mui/material';
import React from 'react';

const CountText = styled('p')(({ theme }) => ({
    ...theme.typography.number8,
    color: theme.palette.custom.font,
    fontSize: 'clamp(0.875rem, 4vw, 1.5rem)',
    textAlign: 'center',
}));

const CountContainer = styled('div')(() => ({
    position: 'absolute',
    bottom: '5%',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '0.125rem',
    flexDirection: 'column',
    alignItems: 'center',
}));

const MemoryCount = ({ received, self }) => {
    return (
        <CountContainer>
            <CountText>{`received ${received}`}</CountText>
            <CountText>{`self ${self}`}</CountText>
        </CountContainer>
    );
};

export default MemoryCount;
