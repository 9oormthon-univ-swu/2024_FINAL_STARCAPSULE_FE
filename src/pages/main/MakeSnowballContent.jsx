import { Typography } from '@mui/material';
import React from 'react';

const MakeSnowballContent = () => {
    return (
        <Typography
            variant='subtitle2'
            sx={{
                color: 'custom.font',
                textAlign: 'center',
                whiteSpace: 'pre-line',
                fontWeight: 700,
                '& span': {
                    color: 'custom.button2',
                },
            }}
        >
            {`친구의 스노우볼에 추억이 전달되었어요!\n`}
            <span>
                {`나만의 스노우볼을 만들고\n올해의 소중한 추억을 기록해볼까요?`}
            </span>
        </Typography>
    );
};

export default MakeSnowballContent;
