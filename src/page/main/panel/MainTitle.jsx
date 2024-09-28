import { EditIcon } from '@/components/icons';
import palette from '@/constants/palette';
// import textStyles from '@/constants/textStyles';
import { IconButton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

const MainTitle = ({ nickname }) => {
    const isRow = nickname.length <= 5;
    const [currNickname, setCurrNickname] = useState(nickname);

    const handleChange = (e) => {
        setCurrNickname(e.target.value);
    };
    return (
        <Stack
            spacing={isRow ? 0.5 : 0.25}
            alignItems={isRow ? 'center' : 'flex-start'}
            justifyContent={isRow ? 'flex-start' : 'row'}
            direction={isRow ? 'row' : 'column'}
        >
            <Typography variant='Heading1'>
                <input
                    onChange={handleChange}
                    style={{
                        color: palette.main2,
                        border: 'none',
                        outline: 'none',
                        width: `${currNickname.length + 1}ch`,
                        // ...textStyles.Heading1,
                    }}
                    value={nickname}
                />
                님의
            </Typography>
            <Stack direction={'row'} alignItems={'center'} spacing={'0.25rem'}>
                <Typography variant='Heading1'>스노우볼</Typography>
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
