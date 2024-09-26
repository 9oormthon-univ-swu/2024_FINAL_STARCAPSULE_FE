import { Button, IconButton, Modal, Stack, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '290px',
    height: '211px',
    borderRadius: '20px',
    backgroundColor: '#FFFCFA', // 모달 배경색
    boxShadow: '0px 0px 4px 0px rgba(40, 40, 40, 0.20)', // 그림자 설정
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '16px',
  };
  

  const TransmissionModal = ({ open, onClose, onConfirm }) => {
    return (
      <Modal
        open={open}
        onClose={onClose}
        aria-describedby="transmission-modal-description"
      >
        <Stack sx={style} direction={'column'} justifyContent={'center'}>
          <Stack direction={'row'} justifyContent={'flex-end'} sx={{ width: '100%' }}>
            <IconButton onClick={onClose} sx={{ padding: 0 }}>
              <CloseIcon />
            </IconButton>
          </Stack>
  
          <Typography
            id={'transmission-modal-description'}
            align="center"
            sx={{
              color: '#282828', // 폰트 색상
              fontWeight: 'bold',
              marginBottom: '8px',
            }}
          >
            전달 후에는 수정이 불가해요.
          </Typography>

          <Typography
          align="center"
          sx={{ color: '#282828', marginBottom: '16px' }}
        >
          이대로 전달할까요?
        </Typography>

        <Button
          onClick={onConfirm}
          sx={{
            width: '100%',
            backgroundColor: '#7F5539',
            color: '#ffffff',
            height: '48px',
            fontSize: '16px',
            borderRadius: '0 0 10px 10px', // 아래 모서리만 둥글게
            '&:hover': {
              backgroundColor: '#8a613e',
            },
          }}
        >
          추억 전달하기
        </Button>
      </Stack>
    </Modal>
  );
};

export default TransmissionModal;
