import React, { useState } from 'react';  
import { Stack } from '@mui/material';
import RecordBoard from './components/RecordBoard';
import RecordSaveButton from './components/RecordSaveButton';
import RecordTitle from './components/RecordTitle';
import SnackBar from '@/components/SnackBar';
import Writer from './components/Writer'; 

const contentstyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
    minHeight: '100vh', 
    width: '100%',
    maxWidth: '600px',
    background: 'black',
    margin: '0 auto',
    padding: '1.5rem',
    boxSizing: 'border-box',
};

const RecordFormAfter = () => {
    const [fwriter, setfwriter] = useState(''); 

    return (
        <>
            <Stack sx={contentstyle}>
                <Stack>
                    <Stack>
                        <RecordTitle />
                    </Stack>
                    <form>
                        <Stack>
                            <RecordBoard showplaceholder='남기고 싶은 추억을 작성해주세요.' />
                        </Stack>
                        <RecordSaveButton />
                    </form>
                </Stack>
                <Writer fwriter={fwriter} setfwriter={setfwriter} /> 
            </Stack>
            <SnackBar />
        </>
    );
};

export default RecordFormAfter;
