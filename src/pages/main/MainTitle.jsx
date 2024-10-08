import { CheckIcon, EditIcon } from '@/components/icons';
import { Box, IconButton, styled, Typography } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.custom.white,
    padding: '0.25rem 0',
    wordBreak: 'keep-all',
    whiteSpace: 'pre',
}));

const StyledIconButton = styled(IconButton)(() => ({
    width: '2rem',
    height: '2rem',
    boxSizing: 'border-box',
}));

const Input = styled('input')(({ theme }) => ({
    color: theme.palette.custom.main2,
    display: 'inline-block',
    outline: 'none',
    border: 'none',
    backgroundColor: 'transparent',
    padding: '0',
    '&:empty:before': {
        content: 'attr(placeholder)',
        color: theme.palette.custom.grey,
    },
    ...theme.typography.Heading1,
}));

const MainTitle = ({ nickname, setNickname }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputWidth, setInputWidth] = useState(0);
    const inputRef = useRef(null);
    const [currNickname, setCurrNickname] = useState(nickname);

    const handleNicknameChange = (event) => {
        setCurrNickname(event.target.value.slice(0, 10)); // 10자 이상 입력 방지
    };

    const handleEdit = () => {
        setIsEditing(true);
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }, 0);
    };

    const calculateInputWidth = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const font = window.getComputedStyle(inputRef.current).font;
        context.font = font;
        const textWidth = context.measureText(
            currNickname.length ? currNickname : '이름'
        ).width;
        setInputWidth(textWidth);
    };

    useEffect(() => {
        if (isEditing) {
            calculateInputWidth();
        }
    }, [currNickname, isEditing]);

    const onConfirmClick = () => {
        const token = localStorage.getItem('token'); 
        console.log('가져온 토큰:', token);
        
        if (token && currNickname) {
            axios
                .post(
                    `http://34.64.85.134:8888/api/capsule/changeSnowballName`,
                    null,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            name: currNickname, // 새로 입력한 닉네임을 API로 전송
                        },
                    }
                )
                .then((response) => {
                    const resultData = response.data.result; // result로 데이터가 반환되기에 이렇게 데이터 추출
                    console.log('닉네임 수정 성공:', response.data);

                    // 수정된 데이터를 로컬 스토리지에 각각 저장
                    localStorage.setItem('snowball_id', resultData.id);
                    localStorage.setItem(
                        'snowball_name',
                        resultData.snowball_name
                    );
                    localStorage.setItem(
                        'snowball_link',
                        resultData.shared_link
                    );

                    setNickname(currNickname); // 닉네임 업데이트
                    setIsEditing(false); // 수정 모드 종료
                })
                .catch((error) => {
                    console.error('닉네임 수정 실패:', error);
                });
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // 기본 엔터 동작 방지
            onConfirmClick(); // 저장 동작 실행
        }
    };

    return (
        <StyledTypography variant='Heading1'>
            {isEditing ? (
                <Input
                    ref={inputRef}
                    type='text'
                    defaultValue={nickname}
                    value={currNickname}
                    onChange={handleNicknameChange}
                    onBlur={handleEdit}
                    spellCheck='false'
                    onKeyDown={handleKeyDown}
                    style={{
                        width: `${inputWidth}px`,
                        transition: 'width 0.2s',
                    }}
                    placeholder='이름'
                />
            ) : (
                <Box component={'span'} sx={{ color: 'custom.main2' }}>
                    {nickname}
                </Box>
            )}
            님의
            {currNickname.length > 5 ? <br /> : ' '}
            스노우볼
            {isEditing ? (
                <StyledIconButton
                    onClick={onConfirmClick}
                    disabled={!currNickname.length}
                >
                    <CheckIcon
                        sx={{
                            color: currNickname.length
                                ? 'custom.main1'
                                : 'custom.grey',
                        }}
                    />
                </StyledIconButton>
            ) : (
                <StyledIconButton onClick={handleEdit}>
                    <EditIcon sx={{ color: 'custom.white' }} />
                </StyledIconButton>
            )}
        </StyledTypography>
    );
};

export default MainTitle;
