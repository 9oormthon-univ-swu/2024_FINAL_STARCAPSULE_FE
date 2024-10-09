// eslint-disable-next-line
import React, { useState } from 'react';
import Layout from '@/layouts/Layout';
import { TextField } from '@mui/material';

const Textfieldstyle = {
    // width: '100%',
    // height: '16.5rem',
    color: '#282828',
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    opacity: '0.8',
};

const Test = () => {
    // const [answer, setAnswer] = useState('');
    return (
        <Layout>
            <TextField
                sx={Textfieldstyle}
                id='answer'
                // value={answer}
                // onChange={setAnswer}
                style={{ resize: 'none' }}
                placeholder='기록을 오늘의 질문 대신  다른 내용을 기록해도 좋아요! 자유롭게 남기고 싶은 추억을 작성해주세요:)'
                variant='standard'
                // InputProps={{ disableUnderline: true }}
            />

            {/* <TextField
                sx={Textfieldstyle}
                id='answer'
                value={answer}
                onChange={setAnswer}
                placeholder='기록을 오늘의 질문 대신  다른 내용을 기록해도 좋아요! 자유롭게 남기고 싶은 추억을 작성해주세요:)'
                multiline
                variant='standard'
                InputProps={{ disableUnderline: true }}
            /> */}
        </Layout>
    );
};

export default Test;
