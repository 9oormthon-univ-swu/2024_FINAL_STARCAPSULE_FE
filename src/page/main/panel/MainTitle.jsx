import { EditIcon } from '@/components/icons';
import palette from '@/constants/palette';
import { IconButton, Stack, Typography } from '@mui/material';
import React from 'react';

const MainTitle = ({ nickname }) => {
    const isRow = nickname.length < 5;
    return (
        <Stack
            spacing={0.5}
            alignItems={isRow ? 'center' : 'flex-start'}
            justifyContent={isRow ? 'flex-start' : 'row'}
            direction={isRow ? 'row' : 'column'}
        >
            <Typography variant='Heading1' fontSize={'1.5rem'}>
                <span color={palette.main2}>{nickname}</span>
                님의
            </Typography>
            <Stack direction={'row'} alignItems={'center'} spacing={'0.25rem'}>
                <Typography variant='Heading1' fontSize={'1.5rem'}>
                    스노우볼
                </Typography>
                <IconButton
                    sx={{
                        w: '1.5rem !important',
                        h: '1.5rem !important',
                        p: 0,
                    }}
                >
                    <EditIcon color='custom.white' />
                </IconButton>
            </Stack>
        </Stack>
    );
};

export default MainTitle;
