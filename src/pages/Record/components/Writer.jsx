import React, { useState } from 'react';
import { Input, Typography, IconButton, Box } from '@mui/material';
import { EditIcon, CheckIcon } from '@/components/icons';

const Writer = ({ fwriter, setfwriter }) => {
    const [writer, setwriter] = useState(fwriter);
    const [iswriterEdit, setIswriterEdit] = useState(false);

    const handleWriterChange = (e) => {
        setwriter(e.target.value.slice(0, 10));
    };

    const handleWriterEdit = () => {
        setIswriterEdit(true);
    };

    const onConfirmClick = () => {
        setfwriter(writer);
        setIswriterEdit(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onConfirmClick();
        }
    };

    return (
        <Typography sx={titlestyle}>
            From.&nbsp;
            {iswriterEdit ? (
                <Input
                    type='text'
                    placeholder='이름을 작성해주세요.'
                    value={writer}
                    onChange={handleWriterChange}
                    onBlur={onConfirmClick}
                    spellCheck='false'
                    onKeyDown={handleKeyDown}
                    style={{ width: '10rem', color: '#fff' }}
                />
            ) : (
                <Box component={'span'} sx={{ color: '#fff' }}>
                    {writer}
                </Box>
            )}
            {iswriterEdit ? (
                <IconButton onClick={onConfirmClick} disabled={!writer.length}>
                    <CheckIcon
                        sx={{
                            color: writer.length
                                ? 'custom.main1'
                                : 'custom.grey',
                        }}
                    />
                </IconButton>
            ) : (
                <IconButton onClick={handleWriterEdit}>
                    <EditIcon sx={{ color: 'custom.white' }} />
                </IconButton>
            )}
        </Typography>
    );
};

export default Writer;

//Design
const titlestyle = {
    color: '#fff',
    marginTop: '1rem',
    textAlign: 'right',
};
