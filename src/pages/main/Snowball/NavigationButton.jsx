import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import { IconButton, Stack, styled } from '@mui/material';
import React from 'react';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.custom.white,
    padding: 0,
    height: '100%',
    aspectRatio: '1/1',
    '& svg': {
        width: '100%',
        height: '100%',
    },
}));

const NavigationButton = () => {
    return (
        <Stack
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{
                position: 'absolute',
                top: '84%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '105%',
                minHeight: '1.5rem',
                height: '7%',
                maxHeight: '3rem',
            }}
        >
            <StyledIconButton>
                <ChevronLeftIcon />
            </StyledIconButton>
            <StyledIconButton>
                <ChevronRightIcon />
            </StyledIconButton>
        </Stack>
    );
};

export default NavigationButton;
