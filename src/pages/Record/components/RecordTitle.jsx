import React, { useState,} from 'react';
import { Input, Typography, IconButton, Box, } from '@mui/material';
import { EditIcon, CheckIcon } from '@/components/icons';

const RecordTitle = ({question, setquestion}) => {
    // 제목(질문), 수정상태 관리
    const [title, setTitle] = useState(question);
    const [isTitleEdit, setIsTitleEdit] = useState(false);

    // 제목 변경 핸들러
    const handleTitleChange = (e) => {
        setTitle(e.target.value.slice(0, 30)); // 제목은 20자 입력까지만
    };

    // 수정 상태 변경 핸들러
    const handleTitleEdit = () => {
        setIsTitleEdit(true);
    };

    // 제목 저장 핸들러
    const onConfirmClick = () => {
        setquestion(title);
        setIsTitleEdit(false); // 수정 모드 종료
    };

    // 엔터키를 눌렀을 때 저장
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
        event.preventDefault(); // 기본 엔터 동작 방지
        onConfirmClick(); // 저장 동작 실행
        }
    };

    return (
        <Typography sx={titlestyle}>
        {isTitleEdit ? (
            <Input
            type="text"
            value={title}
            onChange={handleTitleChange}
            onBlur={onConfirmClick} // 수정 모드 종료 및 저장
            spellCheck="false"
            onKeyDown={handleKeyDown}
            style={{width:'16rem', color:'#fff'}}
            />
        ) : (
            <Box component={'span'} sx={{ color: '#fff' }}>
                {title}
            </Box>
        )}
        {isTitleEdit ? (
            <IconButton onClick={onConfirmClick} disabled={!title.length}>
            <CheckIcon
                sx={{
                color: title.length ? 'custom.main1' : 'custom.grey',
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
    color: '#fff',
    fontSize: '1.25rem',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: '1.75rem',
    marginBottom: '0.75rem'
  }