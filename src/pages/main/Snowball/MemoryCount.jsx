import { styled } from '@mui/material';
import React, { useEffect, useState } from 'react';

const CountText = styled('p')(({ theme }) => ({
    ...theme.typography.number8,
    color: theme.palette.custom.font,
    fontSize: 'clamp(0.875rem, 4vw, 1.3rem)',
    textAlign: 'center',
}));

const CountContainer = styled('div')(() => ({
    position: 'absolute',
    top: '84%',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '0.125rem',
    flexDirection: 'column',
    alignItems: 'center',
}));

const MemoryCount = ({ received, self }) => {
    const [cache, setCache] = useState({ received: 0, self: 0 });
    useEffect(() => {
        if (received !== undefined && self !== undefined) {
            if (received !== cache.received) {
                setCache((prev) => ({ ...prev, received }));
            }
            if (self !== cache.self) {
                setCache((prev) => ({ ...prev, self }));
            }
        }
    }, [received, self]);

    return (
        <CountContainer>
            <CountText>{`received ${cache.received}`}</CountText>
            <CountText>{`self ${cache.self}`}</CountText>
        </CountContainer>
    );
};

export default MemoryCount;
