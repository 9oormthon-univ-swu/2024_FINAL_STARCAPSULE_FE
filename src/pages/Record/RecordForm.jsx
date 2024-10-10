import React, { useState, useRef } from 'react';
import { Stack, Typography } from '@mui/material';
import RecordBoard from './components/RecordBoard';
import RecordSaveButton from './components/RecordSaveButton';
import RecordTitle from './components/RecordTitle';
import RecordUpper from './components/RecordUpper';
import SnackBar from '@/components/SnackBar';
import AlertModal from '@/components/AlertModal';
import { useNavigate } from 'react-router-dom';
import SelectSnowballObject from '@/components/SelectSnowballObject';
import useAxiosWithAuth from '@/utils/useAxiosWithAuth';

const RecordForm = () => {
    const navigate = useNavigate();
    // useState로 상태 관리
    const [title, setTitle] = useState('" c가요?"');
    const [answer, setAnswer] = useState('');
    const [inputCount, setInputCount] = useState(0);
    const [image, setImage] = useState(null);
    const [object_name, setObjectName] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarText, setSnackbarText] = useState('');
    const [openModal, setopenModal] = useState(false);
    // RecordBoard 참조 (자동스크롤)
    const recordBoardRef = useRef(null); // RecordBoard 참조
    const selectObjectRef = useRef(null); //SelectSnowballObject 참조

    // 업로드 파일 관리
    const handleSetImage = (image) => {
        setImage(image);
    };

    // 텍스트 변경 및 글자수 계산 처리 함수
    const handleAnswerChange = (e) => {
        setAnswer(e.target.value.slice(0, 199));
        setInputCount(e.target.value.length);
    };

    // 스낵바 텍스트 변경
    const handleSnackTextChange = (e) => {
        setSnackbarText(e.target.value.slice(0, 199));
    };

    // 스낵바 닫기 처리 함수
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    //모달 확인 버튼 처리 함수 & 데이터 전달
    const axiosInstance = useAxiosWithAuth();
    const handleAcceptModal = async () => {
        // FormData 객체를 사용해 이미지 파일과 텍스트 데이터를 서버로 전송
        console.log(typeof image);

        const formData = new FormData();
        // formData.append('answer', answer);
        formData.append('image', image);
        // formData.append('title', title);
        // formData.append('object_name', object_name);

        console.log('answer', answer);
        console.log('image', image);
        console.log('title', title);
        console.log('object_name', object_name);
        console.log('formData', formData);

        await axiosInstance
            .post(`/api/my_memory/write?`, formData, {
                params: {
                    title: title,
                    answer: answer,
                    shapeName: object_name,
                },
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then(() => {
                setOpenSnackbar(true);
                setSnackbarText('스노우볼에 추억 담는 중');
                navigate('/mycomplete');
            })
            .catch((error) => {
                console.log(error);
                setOpenSnackbar(true);
                setSnackbarText('오류가 발생했습니다.');
            });
    };

    // 모달 닫기 처리 함수
    const handleCloseModal = () => {
        setopenModal(false);
    };

    // 폼 제출 처리 함수
    const handleSubmit = (e) => {
        e.preventDefault();

        // 폼 데이터 확인
        if (!answer) {
            setOpenSnackbar(true); //기록한 내용이 없을 경우 스낵바 True
            setSnackbarText('추억이 작성되지 않았어요.');
            recordBoardRef.current.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        //장식이 없을 경우
        else if (!object_name) {
            setOpenSnackbar(true); //기록한 내용이 없을 경우 스낵바 True
            setSnackbarText('장식이 선택되지 않았어요.');
            selectObjectRef.current.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        //text가 있을 경우 모달 오픈
        setopenModal(true);
    };

    return (
        <>
            <Stack sx={contentstyle}>
                <Stack>
                    <Stack ref={selectObjectRef}>
                        <RecordUpper sx={{ float: 'left' }}></RecordUpper>
                    </Stack>
                    <Stack>
                        <SelectSnowballObject
                            snowballObject={object_name}
                            setSnowballObject={setObjectName}
                            mine
                        />
                    </Stack>
                    <Stack ref={recordBoardRef}>
                        <RecordTitle
                            question={title}
                            setquestion={setTitle}
                        ></RecordTitle>
                    </Stack>
                    <form onSubmit={handleSubmit}>
                        <Stack>
                            <RecordBoard
                                handleSetImage={handleSetImage}
                                answer={answer}
                                inputCount={inputCount}
                                handleTextChange={handleAnswerChange}
                                showplaceholder='남기고 싶은 추억을 작성해주세요.'
                            />
                        </Stack>
                        <RecordSaveButton></RecordSaveButton>
                    </form>
                </Stack>
            </Stack>
            <AlertModal
                open={openModal}
                onClose={handleCloseModal}
                buttonText='추억 보관하기'
                onButtonClick={handleAcceptModal}
                showplaceholder='남기고 싶은 추억을 작성해주세요.'
            >
                <Stack>
                    <Typography sx={modaltextstyle1}>
                        보관후에는 수정이 불가해요.
                    </Typography>
                    <Typography sx={modaltextstyle2}>
                        이대로 전달할까요?
                    </Typography>
                </Stack>
            </AlertModal>
            <SnackBar
                openSnackbar={openSnackbar}
                handleCloseSnackbar={handleCloseSnackbar}
                snackbarText={snackbarText}
                setSnackbarText={handleSnackTextChange}
            />
        </>
    );
};

export default RecordForm;

//Design
const contentstyle = {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    maxWidth: '600px',
    background: '#4D4D4D',
    margin: '0 auto',
    padding: '1.5rem',
    boxSizing: 'border-box',
};

const modaltextstyle1 = {
    fontFamily: 'Noto Sans',
    fontSize: '0.92rem',
    fontWeight: '700',
    textAlign: 'center',
    color: '#7F5539',
};
const modaltextstyle2 = {
    fontFamily: 'Noto Sans',
    fontSize: '0.92rem',
    fontWeight: '700',
    textAlign: 'center',
    color: '#282828',
};
