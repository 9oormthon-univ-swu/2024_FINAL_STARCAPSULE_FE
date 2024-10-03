import { Box, Stack, styled, Typography } from '@mui/material';
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

const WriterText = styled(Typography)(() => ({
    textAlign: 'center',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    maxWidth: '5rem',
}));

const SnowballObjectContainer = styled(Stack)(() => ({
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '5rem',
    position: 'absolute',
    width: '27%',
}));

const SnowballObject = ({ writer, variant, sx, black }) => {
    return (
        <SnowballObjectContainer spacing={0.5} sx={sx}>
            <WriterText
                variant={'body3'}
                sx={{
                    color: black ? 'custom.font' : 'custom.white',
                }}
            >
                {writer}
            </WriterText>
            <Box
                sx={{
                    minWidth: '3.375rem',
                    width: '67.5%',
                    maxHeight: '5.625rem',
                    aspectRatio: '1/1',
                }}
            >
                <img
                    src={SnowballObjects[variant]}
                    alt={`${writer}가 남긴 추억`}
                    width={'100%'}
                    height={'100%'}
                />
            </Box>
        </SnowballObjectContainer>
    );
};

export default SnowballObject;
