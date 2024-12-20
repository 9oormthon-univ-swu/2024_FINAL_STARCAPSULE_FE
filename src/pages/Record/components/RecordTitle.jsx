import React, { useState, useEffect } from 'react';
import { Input, Typography, IconButton } from '@mui/material';
import { EditIcon, CheckIcon } from '@/components/icons';
import useAxiosWithAuth from '@/utils/useAxiosWithAuth';

const RecordTitle = ({ title, setTitle, goToMain }) => {
    // 제목(질문), 수정상태 관리
    const [isTitleEdit, setIsTitleEdit] = useState(false);

    //제목 변경 핸들러
    const handleTitleChange = (e) => {
        setTitle(e.target.value.slice(0, 30)); // 제목은 20자 입력까지만
    };

    // 수정 상태 변경 핸들러
    const handleTitleEdit = () => {
        setIsTitleEdit(true);
    };

    // 제목 저장 핸들러
    const onConfirmClick = () => {
        setTitle(title);
        setIsTitleEdit(false); // 수정 모드 종료
    };

    // 엔터키를 눌렀을 때 저장

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // 기본 엔터 동작 방지
            onConfirmClick(); // 저장 동작 실행
        }
    };

    //질문 가져오기
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
        <Typography sx={titlestyle} variant='body1' component='div'>
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
                <Typography
                    component='span'
                    variant='body1'
                    sx={{ color: 'custom.white' }}
                >
                    {title}
                </Typography>
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
};
