import { Stack } from '@mui/material';
import React, { useState } from 'react';
import DDayTitle from './DDayTitle';
import MainTitle from './MainTitle';

const Title = () => {
    const [nickname, setNickname] = useState('미르미미르미');
    return (
        <Stack direction={'column'}>
            <DDayTitle />
            <MainTitle nickname={nickname} setNickname={setNickname} />
        </Stack>
    );
};

export default Title;
