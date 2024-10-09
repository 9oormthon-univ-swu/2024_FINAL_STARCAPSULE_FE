import React, { useState } from 'react';
import { Stack } from '@mui/material';
import ImgUploadButton from './ImgUploadButton';

const RecordBoard = ({
    answer,
    inputCount,
    handleTextChange,
    handleSetImage,
    showplaceholder,
}) => {
    //이미지 나타나기
    const [imagePreview, setImagePreview] = useState(null);

    // 업로드한 이미지 출력
    const handleSetPreviewImage = (imageUrl) => {
        setImagePreview(imageUrl); // Set image preview URL
    };

    return (
        <div style={RecordBgstyle}>
            <Stack sx={imgcontainer}>
                <ImgUploadButton
                    setImage={handleSetImage}
                    setPreviewImage={handleSetPreviewImage}
                    hideButton={!!imagePreview}
                ></ImgUploadButton>
                {imagePreview && (
                    <div>
                        <img
                            src={imagePreview}
                            alt='Upload Img'
                            style={{
                                maxWidth: '15rem',
                                maxHeight: '15rem',
                                borderRadius: '0.75rem',
                                backgroundSize: 'contain',
                            }}
                        />
                    </div>
                )}
            </Stack>

            <Stack>
                <textarea
                    id='answer'
                    value={answer}
                    onChange={handleTextChange}
                    placeholder={showplaceholder}
                    style={Textfieldstyle}
                />
            </Stack>
            <Stack>
                <div style={{ textAlign: 'right' }}>
                    <span>{inputCount}</span>
                    <span>/200</span>
                </div>
            </Stack>
        </div>
    );
};

export default RecordBoard;

//Design
const Textfieldstyle = {
    width: '100%',
    height: '16.5rem',
    background: '#fffcfa',
    color: '#282828',
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    fontFamily: 'Griun NoltoTAENGGU',
    resize: 'none',
    border: 'none',
    outline: 'none',
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
    boxSizing: 'border-box',
};
