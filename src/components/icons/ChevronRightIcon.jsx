import { createSvgIcon } from '@mui/material';
import React from 'react';

const ChevronRightIcon = createSvgIcon(
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'>
        <path
            d='M9 6L15 12L9 18'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
        />
    </svg>,
    'ChevronRightIcon'
);
export default ChevronRightIcon;