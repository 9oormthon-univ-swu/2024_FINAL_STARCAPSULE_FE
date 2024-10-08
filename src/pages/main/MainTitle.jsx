import { CheckIcon, EditIcon } from '@/components/icons';
import { Box, IconButton, styled, Typography } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // axios import 추가

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

const MainTitle = ({ snowball, setSnowballName }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputWidth, setInputWidth] = useState(0);
    const inputRef = useRef(null);
    const [currSnowball, setCurrSnowball] = useState(snowball);

    const handleSnowballChange = (event) => {
        setCurrSnowball(event.target.value.slice(0, 10)); // 10자 이상 입력 방지
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
            currSnowball.length ? currSnowball : '이름'
        ).width;
        setInputWidth(textWidth);
    };

    useEffect(() => {
        if (isEditing) {
            calculateInputWidth();
        }
    }, [currSnowball, isEditing]);

    const onConfirmClick = () => {
        const token = localStorage.getItem('token'); 
        console.log('가져온 토큰:', token);

        if (token && currSnowball) { // currNickname -> currSnowball로 변경
            axios
                .post(
                    `http://34.64.85.134:8888/api/capsule/changeSnowballName`,
                    null,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            name: currSnowball, // 스노우볼 이름을 API로 전송
                        },
                    }
                )
                .then((response) => {
                    const resultData = response.data.result;
                    console.log('닉네임 수정 성공:', response.data);

                    localStorage.setItem('snowball_id', resultData.id);
                    localStorage.setItem(
                        'snowball_name',
                        resultData.snowball_name
                    );
                    localStorage.setItem(
                        'snowball_link',
                        resultData.shared_link
                    );

                    setSnowballName(currSnowball); // 닉네임 업데이트
                    setIsEditing(false); // 수정 모드 종료
                })
                .catch((error) => {
                    console.error('닉네임 수정 실패:', error);
                });
        }

        if (!currSnowball.length) return;
        setSnowballName(currSnowball)
            .then(() => setIsEditing(false))
            .catch((e) => {
                console.log('error', e);
            });
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onConfirmClick();
        }
    };

    return (
        <StyledTypography variant='Heading1'>
            {isEditing ? (
                <Input
                    ref={inputRef}
                    type='text'
                    value={currSnowball}
                    onChange={handleSnowballChange}
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
                    {snowball}
                </Box>
            )}
            님의
            {currSnowball.length > 5 ? <br /> : ' '}
            스노우볼
            {isEditing ? (
                <StyledIconButton
                    onClick={onConfirmClick}
                    disabled={!currSnowball.length}
                >
                    <CheckIcon
                        sx={{
                            color: currSnowball.length
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
