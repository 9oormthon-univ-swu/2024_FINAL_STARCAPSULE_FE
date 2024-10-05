import { createSvgIcon } from '@mui/material';
import React from 'react';

const ChevronLeftIcon = createSvgIcon(
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'>
        <path
            d='M15 6L9 12L15 18'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>,
    'ChevronLeftIcon'
);

export default ChevronLeftIcon;
