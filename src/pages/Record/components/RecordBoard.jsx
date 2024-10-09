import React, { useState } from 'react';
import { Stack, TextField } from '@mui/material'
import ImgUploadButton from "./ImgUploadButton";

const RecordBoard = ({
    children,
    answer, 
    inputCount, 
    handleTextChange,
    handleSetImage,
}) => {
    //이미지 나타나기
    const [imagePreview, setImagePreview] = useState(null);

    // 업로드한 이미지 출력
    const handleSetPreviewImage = (imageUrl) => {
        setImagePreview(imageUrl); // Set image preview URL
    };

    return(
        <div style={RecordBgstyle}>
            <Stack sx={imgcontainer}>
                <ImgUploadButton
                    setImage={handleSetImage}
                    setPreviewImage={handleSetPreviewImage}
                    hideButton={!!imagePreview} >
                </ImgUploadButton>
                {imagePreview && (
                    <div> 
                    <img
                        src={imagePreview} 
                        alt="Upload Img" 
                        style={{ width: '100%', borderRadius:'0.75rem',}} />
                    </div>
                )}
            </Stack>

            <Stack>
                <TextField sx={Textfieldstyle}
                  id="answer"
                  value={answer}
                  onChange={handleTextChange}
                  placeholder="기록을 오늘의 질문 대신  다른 내용을 기록해도 좋아요! 자유롭게 남기고 싶은 추억을 작성해주세요:)"
                  multiline
                  variant="standard"
                  InputProps={{ disableUnderline: true }}
                />
            </Stack>
            <Stack>
                <div style={{ textAlign:'right'}}>
                    <span>{inputCount}</span>
                    <span>/200</span>
                </div>
            </Stack>
            {children && <Stack>{children}</Stack>}
        </div>
    );
};

export default RecordBoard;

//Design
const Textfieldstyle = {
    width: '100%',
    height: '16.5rem',
    color: '#282828',
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    opacity: '0.8',
};

const imgcontainer = {
    maxWidth: ' 100%',
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
    boxSizing: 'border-box'
  };