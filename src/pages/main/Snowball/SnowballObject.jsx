import { Stack, styled, Typography } from '@mui/material';
import React from 'react';
import christmas_tree from '@/assets/object/christmas_tree.svg';
import gingerbread_house from '@/assets/object/gingerbread_house.svg';
import lamplight from '@/assets/object/lamplight.svg';
import moon from '@/assets/object/moon.svg';
import santa_sleigh from '@/assets/object/santa_sleigh.svg';
import santa from '@/assets/object/santa.svg';
import snowman from '@/assets/object/snowman.svg';
import snowflake from '@/assets/object/snowflake.svg';

const SnowballObjects = {
    christmas_tree: christmas_tree,
    gingerbread_house: gingerbread_house,
    lamplight: lamplight,
    moon: moon,
    santa_sleigh: santa_sleigh,
    santa: santa,
    snowman: snowman,
    snowflake: snowflake,
};

const WriterText = styled(Typography)(({ theme }) => ({
    color: theme.palette.custom.white,
    textAlign: 'center',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: '5rem',
}));

const SnowballObject = ({ writer, variant }) => {
    return (
        <Stack direction={'column'} alignItems={'center'} width={'5rem'}>
            <WriterText variant={'body3'}>{writer}</WriterText>
            <img
                src={SnowballObjects[variant]}
                alt={`${writer}가 남긴 추억`}
                style={{
                    width: '3.375rem',
                    height: '3.375rem',
                }}
            />
        </Stack>
    );
};

export default SnowballObject;
