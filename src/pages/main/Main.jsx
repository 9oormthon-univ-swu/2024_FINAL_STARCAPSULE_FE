import { Stack } from '@mui/material';
import React, { useState } from 'react';
import DDayTitle from './DDayTitle';
import MainTitle from './MainTitle';
import Snowball from './Snowball/Snowball';
import { ObjectNames } from '@/constants/ObjectNames';

// 임시 적용 데이터
const memories = [
    { id: 1, writer_name: '닉네임', object_name: ObjectNames.SNOWMAN },
    { id: 2, writer_name: '닉네임', object_name: ObjectNames.SNOWMAN },
    { id: 3, writer_name: '닉네임', object_name: ObjectNames.MOON },
    { id: 4, writer_name: '닉네임', object_name: ObjectNames.SANTA },
    { id: 5, writer_name: '닉네임', object_name: ObjectNames.SNOWFLAKE },
    { id: 6, writer_name: '닉네임', object_name: ObjectNames.SANTA_SLEIGH },
];

const Main = () => {
    const [nickname, setNickname] = useState('닉네임');
    return (
        <Stack direction={'column'}>
            <DDayTitle />
            <MainTitle nickname={nickname} setNickname={setNickname} />
            <Snowball
                memories={memories}
                current={1}
                total={3}
                received={5}
                self={3}
                onLeftClick={() => console.log('clicked left')}
                onRightClick={() => console.log('clicked right')}
            />
        </Stack>
    );
};

export default Main;
