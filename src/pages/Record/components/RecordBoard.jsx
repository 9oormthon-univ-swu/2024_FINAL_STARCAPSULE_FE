import React from 'react';
import { Stack } from '@mui/material';
import ImgUploadButton from './ImgUploadButton';

const RecordBoard = ({
    content,
    imageUrl,
    answer,
    inputCount,
    handleTextChange,
    showplaceholder,
    handleSetImage,
    selectedImage,
    fileInputRef,
    isReadOnly = false, // 읽기 전용 모드 여부
}) => {
    return (
        <div style={RecordBgstyle}>
            <Stack sx={imgcontainer}>
                {isReadOnly && imageUrl ? (
                    <img
                        src={imageUrl}
                        alt='기억 이미지'
                        style={{ maxWidth: '100%', borderRadius: '10px' }}
                    />
                ) : !isReadOnly ? (
                    <ImgUploadButton
                        id='image'
                        selectedImage={selectedImage}
                        setImage={handleSetImage}
                        fileInputRef={fileInputRef}
                    />
                ) : null}
            </Stack>

            <Stack>
                {isReadOnly ? (
                    <div style={{ ...Textfieldstyle, ...readOnlyTextStyle }}>
                        {content || "추억이 없습니다."}
                    </div>
                ) : (
                    <textarea
                        id='answer'
                        value={answer}
                        onChange={handleTextChange}
                        placeholder={showplaceholder}
                        style={Textfieldstyle}
                        rows={Math.max(4, answer.split('\n').length)} // 내용에 따라 행이 늘어나도록 설정
                    />
                )}
            </Stack>

            {!isReadOnly && (
                <Stack>
                    <div style={{ textAlign: 'right' }}>
                        <span>{inputCount}</span>
                        <span>/200</span>
                    </div>
                </Stack>
            )}
        </div>
    );
};

export default RecordBoard;

//Design
const Textfieldstyle = {
    width: '100%',
    minHeight: '16.5rem',
    background: '#fffcfa',
    color: '#282828',
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    fontFamily: 'Griun NoltoTAENGGU',
    resize: 'none',
    border: 'none',
    outline: 'none',
};

const readOnlyTextStyle = {
    whiteSpace: 'pre-wrap',   // 줄바꿈을 허용
    wordWrap: 'break-word',   // 단어가 길 경우 줄바꿈
};

const imgcontainer = {
    maxWidth: '100%',
    textAlign: 'center',
    marginBottom: '1rem',
};

const RecordBgstyle = {
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
    borderRadius: '1.25rem',
    background: '#FFFCFA',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '312px',
    margin: '0 auto',
    boxSizing: 'border-box',
}; 