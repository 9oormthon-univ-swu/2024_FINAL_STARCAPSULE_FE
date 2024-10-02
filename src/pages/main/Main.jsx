import { Stack } from '@mui/material';
import React, { useState } from 'react';
import DDayTitle from './DDayTitle';
import MainTitle from './MainTitle';

const Main = () => {
    const [nickname, setNickname] = useState('닉네임');
    return (
        <Stack direction={'column'}>
            <DDayTitle />
            <MainTitle nickname={nickname} setNickname={setNickname} />
        </Stack>
    );
};

export default Main;
