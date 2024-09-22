import React from 'react';
import { Button } from '@mui/material';
import AlertModal from './AlertModal';

const meta = {
    title: 'AlertModal',
    component: AlertModal,
    // tags: ['autodocs'],
    argTypes: {
        open: { control: 'boolean' },
        text: { control: 'text' },
        confirmText: { control: 'text' },
        cancelText: { control: 'text' },
        onConfirm: { action: 'confirmed' },
        onCancel: { action: 'canceled' },
    },
    decorators: [
        (Story, context) => {
            const [open, setOpen] = React.useState(false);

            const handleOpen = () => setOpen(true);
            const handleClose = () => setOpen(false);

            return (
                <div>
                    <Button variant='contained' onClick={handleOpen}>
                        Open Modal
                    </Button>

                    <AlertModal
                        open={open}
                        onClose={handleClose} // 모달을 닫는 함수를 onClose로 전달
                        {...context.args} // 스토리에서 받은 props 전달
                    />
                </div>
            );
        },
    ],
};

// const Template = (args) => <div>{/* 필요한 스토리 내용 */}</div>;

// 기본 스토리 설정
const Default = {
    args: {
        open: false, // 기본값으로 모달을 닫힌 상태로 설정
        text: '알림창 내용',
        confirmText: '확인',
        onConfirm: () => {
            window.alert('확인 버튼 클릭');
        },
    },
};

// export const Default;
export default meta;
export { Default };
