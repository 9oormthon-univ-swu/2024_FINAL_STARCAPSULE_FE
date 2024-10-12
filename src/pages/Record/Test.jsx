import React, { useState, useRef } from 'react';
import { Button, Box } from '@mui/material';
import { PhotoIcon } from '@/components/icons';

const Test = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const fileInputRef = useRef(null); // input에 접근하기 위한 ref

    // 이미지 업로드 핸들러
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    // 이미지를 클릭했을 때 파일 선택 창을 여는 함수
    const handleImageClick = () => {
        fileInputRef.current.click(); // input[type="file"]을 클릭
    };

    return (
        <Box>
            {selectedImage ? (
                // 이미지가 업로드되면 button으로 감싸서 클릭 가능하도록 변경
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
                // 이미지가 없을 경우 기본 텍스트와 버튼이 보임
                <Button
                    sx={imgBtnstyle}
                    component='label'
                    onClick={handleImageClick}
                >
                    <PhotoIcon style={iconBtnStyle} />
                </Button>
            )}

            {/* 파일 선택 input (숨김 처리) */}
            <input
                type='file'
                accept='image/*'
                ref={fileInputRef} // ref를 통해 접근
                style={{ display: 'none' }} // input 숨기기
                onChange={handleImageUpload} // 파일 업로드 처리
            />
        </Box>
    );
};

export default Test;

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
