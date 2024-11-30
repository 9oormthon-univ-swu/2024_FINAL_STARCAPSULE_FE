import { createSvgIcon } from '@mui/material';
import React from 'react';

const PhotoShareIcon = createSvgIcon(
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
    >
        <path
            d='M15 8H15.01M12 21H6C5.20435 21 4.44129 20.6839 3.87868 20.1213C3.31607 19.5587 3 18.7956 3 18V6C3 5.20435 3.31607 4.44129 3.87868 3.87868C4.44129 3.31607 5.20435 3 6 3H18C18.7956 3 19.5587 3.31607 20.1213 3.87868C20.6839 4.44129 21 5.20435 21 6V13'
            stroke='#FFFCFA'
            stroke-width='2'
            stroke-linecap='round'
            stroke-linejoin='round'
        />
        <path
            d='M3 15.9998L8 10.9998C8.928 10.1068 10.072 10.1068 11 10.9998L14 13.9998L15 12.9998C15.928 12.1068 17.072 12.1068 18 12.9998M16 21.9998L21 16.9998M21 16.9998V21.4998M21 16.9998H16.5'
            stroke='#FFFCFA'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>,
    'PhotoShareIcon'
);
export default PhotoShareIcon;
