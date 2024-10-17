import React, { useState } from 'react';  
import { Stack } from '@mui/material';
import RecordBoard from '../Record/components/RecordBoard';
import ImageSaveButton from './ImageSaveButton'; 
import RecordTitle from '../Record/components/RecordTitle';


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
                        <ImageSaveButton /> 
                    </form>
                </Stack>
            </Stack>
        </>
    );
};

export default RecordFormAfter;
