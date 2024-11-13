import React, { useState, useEffect } from 'react';
import { Input, Typography, IconButton, Box } from '@mui/material';
import { EditIcon, CheckIcon } from '@/components/icons';
import useAxiosWithAuth from '@/utils/useAxiosWithAuth';

const RecordTitle = ({ title, setTitle, goToMain }) => {
    const [isTitleEdit, setIsTitleEdit] = useState(false);

    const handleTitleChange = (e) => {
        setTitle(e.target.value.slice(0, 30));
    };

    const handleTitleEdit = () => {
        setIsTitleEdit(true);
    };

    const onConfirmClick = () => {
        setTitle(title);
        setIsTitleEdit(false);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onConfirmClick();
        }
    };

    const axiosInstance = useAxiosWithAuth();
    useEffect(() => {
        const getQuestion = async () => {
            await axiosInstance
                .get('/api/question')
                .then((res) => {
                    setTitle(res.data.result.question);
                })
                .catch((error) => {
                    if (error.status === 400) {
                        goToMain();
                    }
                });
        };

        getQuestion();
    }, []);

    return (
        <Typography sx={titlestyle} component='div'>
            {isTitleEdit ? (
                <Input
                    type='text'
                    value={title}
                    onChange={handleTitleChange}
                    onBlur={onConfirmClick}
                    spellCheck='false'
                    onKeyDown={handleKeyDown}
                    style={{ width: '16rem', color: '#fff' }}
                />
            ) : (
                <Box sx={{ display: 'inline', color: '#fff' }}>{title}</Box>
            )}
            {isTitleEdit ? (
                <IconButton onClick={onConfirmClick} disabled={!title.length}>
                    <CheckIcon
                        sx={{
                            color: title.length
                                ? 'custom.main1'
                                : 'custom.grey',
                        }}
                    />
                </IconButton>
            ) : (
                <IconButton onClick={handleTitleEdit}>
                    <EditIcon sx={{ color: 'custom.white' }} />
                </IconButton>
            )}
        </Typography>
    );
};

export default RecordTitle;

//Design
const titlestyle = {
    margin: '2.25rem 0rem 0.75rem',
    color: '#fffcfa',
    fontFamily: 'Griun NoltoTAENGGU',
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
};
