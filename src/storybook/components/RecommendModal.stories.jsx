import React from 'react';
import RecommendModal from '@/components/RecommendModal';
import PWAModalContent from '@/pages/main/PWAModalContent';
import MakeSnowballContent from '@/pages/main/MakeSnowballContent';

const meta = {
    title: 'components/RecommendModal',
    component: RecommendModal,
    tags: ['autodocs'],
    argTypes: {
        open: { control: 'boolean', description: '모달 open 여부' },
        onClose: { description: '모달을 닫는 함수', type: 'function' },
        children: { description: '모달 내용', type: 'node' },
    },
};

// 기본 스토리 설정
const PWAModal = {
    args: {
        open: false, // 기본값으로 모달을 닫힌 상태로 설정
        onClose: () => {}, // onClose 함수는 비어있는 함수로 설정
        buttonText: '확인', // 버튼 텍스트는 '확인'으로 설정
        onButtonClick: () => {}, // onButtonClick 함수는 비어있는 함수로 설정
        children: <PWAModalContent />,
    },
};

const MakeSnowball = {
    args: {
        open: true, // 기본값으로 모달을 열린 상태로 설정
        onClose: () => {}, // onClose 함수는 비어있는 함수로 설정
        buttonText: '확인', // 버튼 텍스트는 '확인'으로 설정
        onButtonClick: () => {}, // onButtonClick 함수는 비어있는 함수로 설정
        children: <MakeSnowballContent />,
    },
};

export default meta;
export { PWAModal, MakeSnowball };
