import ShareModal from '@/components/ShareModal';

const meta = {
    title: 'components/ShareModal',
    component: ShareModal,
    tags: ['autodocs'],
    argTypes: {},
};

// 기본 스토리 설정
const Default = {
    args: {
        open: false, // 기본값으로 모달을 닫힌 상태로 설정
    },
};

export default meta;
export { Default };
