import { ChevronLeftIcon, ChevronRightIcon } from '@/components/icons';
import { IconButton, Stack, styled } from '@mui/material';
import React from 'react';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    color: theme.palette.custom.white,
    p: 0,
    width: '1.5rem',
    height: '1.5rem',
    minWidth: '1.5rem',
    minHeight: '1.5rem',
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
