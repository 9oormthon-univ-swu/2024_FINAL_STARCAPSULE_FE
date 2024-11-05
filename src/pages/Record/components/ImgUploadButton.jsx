import React, { useState, useRef } from 'react';
import { Button, Box } from '@mui/material';
import { PhotoIcon } from '../../../components/icons';

const ImgUploadButton = ({ setImage, handleSetImage, id }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null);

    // 이미지 업로드 핸들러
    const handleImageUpload = (e) => {
        const file = e.target.files[0] && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            setImage(file);
            reader.onload = (e) => {
                setSelectedImage(e.target.result);
                if (handleSetImage) handleSetImage(file);
            };
            reader.readAsDataURL(file);
        }
    };

    // 이미지를 클릭했을 때 파일 선택 창을 여는 함수
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    return (
        <Box>
            {selectedImage ? (
                <Button
                    onClick={handleImageClick}
                    style={{
                        border: 'none',
                        padding: 0,
                        background: 'none',
                        cursor: 'pointer',
                    }}
                >
                    <img
                        src={selectedImage}
                        alt='Uploaded'
                        style={{
                            maxWidth: '15rem',
                            maxHeight: '15rem',
                            borderRadius: '0.75rem',
                            objectFit: 'cover',
                        }}
                    />
                </Button>
            ) : (
                <Button
                    sx={imgBtnstyle}
                    component='label'
                    onClick={handleImageClick}
                >
                    <PhotoIcon style={iconBtnStyle} />
                </Button>
            )}
            <input
                id={id}
                type='file'
                accept='image/*'
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageUpload}
            />
        </Box>
    );
};

export default ImgUploadButton;

//Design
const imgBtnstyle = {
    display: 'flex',
    width: '4rem',
    height: '4rem',
    background: '#fffcfa',
    boxShadow: '0px 0px 4px 0px rgba(40, 40, 40, 0.20)',
    borderRadius: '0.75rem',
};

const iconBtnStyle = {
    width: '1.5rem',
    height: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};
