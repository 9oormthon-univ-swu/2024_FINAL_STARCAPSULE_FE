import React from 'react';
import { Button, IconButton } from '@mui/material';
import { PhotoIcon } from '../../../components/icons';

const ImgUploadButton = ({
    children,
    accept = 'image/jpeg, image/jpg, image/png',
    id,
    setImage,
    setPreviewImage,
    onChange,
    register,
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

    return(
        <Button component="label" sx={imgBtnstyle} disabled={disabled}>
          <IconButton component="span" disabled="none">
            <PhotoIcon></PhotoIcon>
          </IconButton>
          {children}
          <input
              type="file"
              accept={accept}
              style={{ display: 'none' }}
              id={id}
              name={id}
              {...register}
              onChange={handleImageChange}
          />
        </Button>
    );
};

export default ImgUploadButton;

//Design
const imgBtnstyle = {
  display: 'flex',
  width: '3.5rem',
  height: '3.5rem',
  padding: '1.5rem',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#FFFCFA',
  boxShadow: '0px 0px 4px 0px rgba(40, 40, 40, 0.20)',
};