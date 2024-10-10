import React from 'react';
import { Button } from '@mui/material';
import { PhotoIcon } from '../../../components/icons';

const ImgUploadButton = ({
    children,
    accept = 'image/jpeg, image/jpg, image/png',
    id,
    setImage,
    setPreviewImage,
    onChange,
    disabled,
    hideButton,
}) => {
    const handleImageChange = (e) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            if (setImage) {
                setImage([file]);
            }
            reader.onload = (e) => {
                setPreviewImage(e.target.result); // Send base64 URL to setPreviewImage
                if (onChange) onChange();
            };
            reader.readAsDataURL(file); // Convert file to base64 URL
        }
    };

    // 이미지가 업로드되었을 때 hideButton이 true(imagePreview)가 되면 버튼을 숨김
    if (hideButton) return null;

    return (
        <Button component='label' sx={imgBtnstyle} disabled={disabled}>
            <span style={iconBtnStyle}>
                <PhotoIcon></PhotoIcon>
            </span>
            {children}
            <input
                type='file'
                accept={accept}
                style={{ display: 'none' }}
                id={id}
                name={id}
                onChange={handleImageChange}
            />
        </Button>
    );
};

export default ImgUploadButton;

//Design
const imgBtnstyle = {
    display: 'flex',
    width: '4rem',
    height: '4rem',
    color: 'custom.white',
    boxShadow: '0px 0px 4px 0px rgba(40, 40, 40, 0.20)',
    borderRadius: '0.75rem',
};

const iconBtnStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};
