import { CheckIcon, EditIcon } from '@/components/icons';
import { Box, IconButton, styled, Typography } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';

const StyledTypography = styled(Typography)(({ theme }) => ({
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

// 스노우볼 컴포넌트
const MainTitle = ({ nickname, setNickname }) => {
    const [isEditing, setIsEditing] = useState(false); // 닉네임 수정 상태 관리
    const [inputWidth, setInputWidth] = useState(0); // 입력 필드 넓이 관리
    const inputRef = useRef(null);
    const [currNickname, setCurrNickname] = useState(nickname);

    const handleNicknameChange = (event) => {
        setCurrNickname(event.target.value.slice(0, 10)); // 10자 이상 입력 방지
    };

    const handleEdit = () => {
        setIsEditing(true);
        setTimeout(() => {
            if (inputRef.current) {
                inputRef.current.focus(); // input에 포커스
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
        setNickname(currNickname);
        setIsEditing(false);
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
                    onBlur={handleEdit} // 입력이 끝나면 수정 모드 종료
                    spellCheck='false'
                    onKeyDown={handleKeyDown}
                    style={{
                        width: `${inputWidth}px`, // 유동적인 width 설정
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
