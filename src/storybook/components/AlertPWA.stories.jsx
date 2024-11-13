import AlertPWA from '@/components/AlertPWA';

const meta = {
    title: 'components/AlertPWA',
    component: AlertPWA,
    tag: ['autodocs'],
    argTypes: {
        open: { control: 'boolean', description: '모달 open 여부' },
        onClose: { description: '모달을 닫는 함수', type: 'function' },
    },
};

// 기본 스토리 설정
const Default = {
    args: {
        open: false, // 기본값으로 모달을 닫힌 상태로 설정
        onClose: () => {}, // onClose 함수는 비어있는 함수로 설정
        onButtonClick: () => {}, // onButtonClick 함수는 비어있는 함수로 설정
    },
};

export default meta;
export { Default };
