import React, { useState,} from 'react';
import { Input, Typography, IconButton, Box, } from '@mui/material';
import { EditIcon, CheckIcon } from '@/components/icons';

const Writer = ({fwriter, setfwriter}) => {
    // 작성자, 수정상태 관리
    const [writer, setwriter] = useState(fwriter);
    const [iswriterEdit, setIswriterEdit] = useState(false);

    // 작성자 변경 핸들러
    const handleWriterChange = (e) => {
        setwriter(e.target.value.slice(0, 10)); // 작성자 10자 입력까지만
    };

    // 수정 상태 변경 핸들러
    const handleWriterEdit = () => {
        setIswriterEdit(true);
    };

    // 작성자 저장 핸들러
    const onConfirmClick = () => {
        setfwriter(writer);
        setIswriterEdit(false); // 수정 모드 종료
    };

    // 엔터키를 눌렀을 때 저장
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
        event.preventDefault(); // 기본 엔터 동작 방지
        onConfirmClick(); // 저장 동작 실행
        }
    };

    return(
        <Typography sx={titlestyle}>
        From.&nbsp;
        {iswriterEdit ? (
            <Input
            type="text"
            placeholder='이름을 작성해주세요.'
            value={writer}
            onChange={handleWriterChange}
            onBlur={onConfirmClick} // 수정 모드 종료 및 저장
            spellCheck="false"
            onKeyDown={handleKeyDown}
            style={{width:'10rem', color:'#fff'}}
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
                color: writer.length ? 'custom.main1' : 'custom.grey',
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
  }