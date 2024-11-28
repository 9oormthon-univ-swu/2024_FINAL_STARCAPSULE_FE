import React from 'react';
import { Typography } from '@mui/material';
import AlertPWA from '@/components/AlertPWA';

const meta = {
    title: 'components/AlertPWA',
    component: AlertPWA,
    tags: ['autodocs'],
    argTypes: {
        open: { control: 'boolean', description: '모달 open 여부' },
        onClose: { description: '모달을 닫는 함수', type: 'function' },
        children: { description: '모달 내용', type: 'node' },
    },
};

// 기본 스토리 설정
const Default = {
    args: {
        open: false, // 기본값으로 모달을 닫힌 상태로 설정
        onClose: () => {}, // onClose 함수는 비어있는 함수로 설정
        buttonText: '확인', // 버튼 텍스트는 '확인'으로 설정
        onButtonClick: () => {}, // onButtonClick 함수는 비어있는 함수로 설정
        children: (
            <Typography align='center' variant='title2'>
                보관 후에는 수정이 불가해요.
                <br />
                이대로 전달할까요?
            </Typography>
        ),
    },
};

export default meta;
export { Default };
