import AlertModal from '../components/AlertModal';

const meta = {
    title: 'common/AlertModal',
    component: AlertModal,
    tags: ['autodocs'],
    argTypes: {
        open: { control: 'boolean', description: '모달 open 여부' },
        onClose: { description: '모달을 닫는 함수', type: 'function' },
        text: { control: 'text', description: '모달에 표시할 텍스트' },
        confirmText: { control: 'text', description: '확인 버튼 텍스트' },
        cancelText: { control: 'text', description: '취소 버튼 텍스트' },
        onConfirm: { description: '확인 버튼 클릭 시 실행할 함수' },
        onCancel: { description: '취소 버튼 클릭 시 실행할 함수' },
    },
};

// 기본 스토리 설정
const Default = {
    args: {
        open: false, // 기본값으로 모달을 닫힌 상태로 설정
        text: '알림창 내용',
        confirmText: '확인',
        cancelText: '취소',
        onConfirm: () => window.alert('확인 버튼 클릭'),
        onCancel: () => window.alert('취소 버튼 클릭'),
    },
};

export default meta;
export { Default };
