import { CheckIcon, EditIcon } from '@/components/icons';
import { Box, IconButton, styled, Typography } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.custom.white,
    padding: '0.25rem 0',
    wordBreak: 'keep-all',
    whiteSpace: 'pre-wrap',
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

// 스노우볼 컴포넌트
const MainTitle = () => {
    const [nickname, setNickname] = useState('사용자'); // 기본 닉네임 설정
    const [isEditing, setIsEditing] = useState(false); // 닉네임 수정 상태 관리
    const [inputWidth, setInputWidth] = useState(0); // 입력 필드 넓이 관리
    const inputRef = useRef(null);

    const handleNicknameChange = (event) => {
        setNickname(event.target.value);
    };

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const calculateInputWidth = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const font = window.getComputedStyle(inputRef.current).font;
        context.font = font;
        const textWidth = context.measureText(nickname).width;
        setInputWidth(textWidth);
    };

    // 닉네임이 변경될 때마다 입력 필드 크기 계산
    useEffect(() => {
        if (isEditing) {
            calculateInputWidth();
        }
    }, [nickname, isEditing]);

    return (
        <StyledTypography variant='Heading1'>
            {isEditing ? (
                <Input
                    ref={inputRef}
                    type='text'
                    value={nickname}
                    onChange={handleNicknameChange}
                    onBlur={toggleEditing} // 입력이 끝나면 수정 모드 종료
                    style={{
                        width: `${inputWidth}px`, // 유동적인 width 설정
                    }}
                />
            ) : (
                <Box component={'span'} sx={{ color: 'custom.main1' }}>
                    {nickname}
                </Box>
            )}
            님의
            {nickname.length > 5 ? <br /> : ' '}
            스노우볼
            {!isEditing ? (
                <StyledIconButton>
                    <EditIcon sx={{ color: 'custom.white' }} />
                </StyledIconButton>
            ) : (
                <StyledIconButton>
                    <CheckIcon sx={{ color: 'custom.main1' }} />
                </StyledIconButton>
            )}
        </StyledTypography>
    );
};

export default MainTitle;
