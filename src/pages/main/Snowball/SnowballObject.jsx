import { Box, Stack, styled, Typography } from '@mui/material';
import React from 'react';
import { SnowballObjects } from '@/constants/SnowballObjects';

const WriterText = styled(Typography)(({ theme }) => ({
    ...theme.typography.body3,
    fontSize: 'clamp(1.125rem, 5vw, 1.25rem)',
    minHeight: '1.125rem',
    height: '5vw',
    maxHeight: '1.68rem',
    textAlign: 'center',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    width: '100%',
    pointerEvents: 'none',
}));

const SnowballObjectContainer = styled(Stack)(() => ({
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '5rem',
    width: '27%',
    maxWidth: '10rem',
}));

const ImageBox = styled(Box)(() => ({
    minWidth: '3.375rem',
    width: '67.5%',
    maxHeight: '5.625rem',
    aspectRatio: '1/1',
    '& img': {
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
    },
}));

const SnowballObject = ({ id, writer, variant, sx, black }) => {
    return (
        <SnowballObjectContainer key={id} spacing={0.5} sx={sx}>
            <WriterText
                variant={'body3'}
                component={'p'}
                sx={{
                    color: black ? 'custom.font' : 'custom.white',
                }}
            >
                {writer}
            </WriterText>
            <ImageBox>
                <img
                    src={SnowballObjects[variant]}
                    alt={`${writer}가 남긴 추억`}
                />
            </ImageBox>
        </SnowballObjectContainer>
    );
};

export default SnowballObject;
