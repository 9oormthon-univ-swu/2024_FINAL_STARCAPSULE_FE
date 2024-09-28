import { EditIcon } from '@/components/icons';
import { Grid2, Stack, Typography } from '@mui/material';
import React from 'react';

const MainTitle = ({ nickname }) => {
    return (
        <Grid2 container spacing={0.5} alignItems={'center'}>
            <Grid2>
                <Typography variant='title3'>{`${nickname}님의`}</Typography>
            </Grid2>
            <Grid2>
                <Stack
                    direction={'row'}
                    alignItems={'center'}
                    spacing={'0.25rem'}
                >
                    <Typography variant='Heading1'>{`스노우볼`}</Typography>
                    <EditIcon />
                </Stack>
            </Grid2>
        </Grid2>
    );
};

export default MainTitle;
