import React, { useState, useRef } from 'react';
import { Stack, Typography } from '@mui/material';
import RecordBoard from './components/RecordBoard';
import RecordSaveButton from './components/RecordSaveButton';
import Writer from './components/Writer';
import RecordUpper from './components/RecordUpper';
import SnackBar from '@/components/SnackBar';
import AlertModal from '@/components/AlertModal';
import SelectSnowballObject from '@/components/SelectSnowballObject';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const GuestForm = ({ nickname }) => {
    // useState로 상태 관리
    const [answer, setAnswer] = useState('');
    const [inputCount, setInputCount] = useState(0);
    const [writer, setWriter] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [object_name, setObjectName] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarText, setSnackbarText] = useState('');
    const [openModal, setopenModal] = useState(false);
    // RecordBoard 참조 (자동스크롤)
    const recordBoardRef = useRef(null); // RecordBoard 참조
    const writerRef = useRef(null); //Writer 참조
    const selectObjectRef = useRef(null);

    const params = useParams();
    const navigate = useNavigate();

    // 업로드 파일 관리
    const handleSetImage = (uploadedImage) => {
        setUploadedImage(uploadedImage);
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

    //모달 확인 버튼 처리 함수
    const handleAcceptModal = async () => {
        // FormData 객체를 사용해 이미지 파일과 텍스트 데이터를 서버로 전송
        const formData = new FormData();
        // formData.append('answer', answer);
        formData.append('image', uploadedImage);
        // formData.append('writer', writer);
        // formData.append('object_name', object_name);

        console.log('answer:', answer);
        console.log('image:', uploadedImage);
        console.log('writer:', writer);
        console.log('object_name:', object_name);

        await axios.post(
            `${process.env.REACT_APP_API_URL}/api/record`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    title: writer,
                    answer: answer,
                    object_name: object_name,
                    writer: writer,
                    user_id: params.userId,
                },
            }
        );
        navigate('/complete');
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
        } else if (!writer) {
            setOpenSnackbar(true); //작성자가 없을 경우 스낵바 True
            setSnackbarText('이름을 작성해주세요.');
            writerRef.current.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        //장식이 없을 경우
        else if (!object_name) {
            setOpenSnackbar(true); //기록한 내용이 없을 경우 스낵바 True
            setSnackbarText('장식이 선택되지 않았어요.');
            selectObjectRef.current.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        //answer 있을 경우 모달 오픈
        setopenModal(true);
    };

    return (
        <>
            <Stack sx={contentstyle}>
                <Stack>
                    <Stack ref={selectObjectRef}>
                        <RecordUpper sx={{ textAlign: 'left' }}></RecordUpper>
                    </Stack>
                    <Stack>
                        <SelectSnowballObject
                            snowballObject={object_name}
                            setSnowballObject={setObjectName}
                            mine
                        />
                    </Stack>
                    <Stack>
                        <Typography sx={titlestyle}>
                            TO.&nbsp;{nickname}
                        </Typography>
                    </Stack>
                    <form onSubmit={handleSubmit}>
                        <Stack ref={recordBoardRef}>
                            <RecordBoard
                                handleSetImage={handleSetImage}
                                answer={answer}
                                inputCount={inputCount}
                                handleTextChange={handleAnswerChange}
                                showplaceholder='오늘의 질문 대신 다른 내용을 기록해도 좋아요! 자유롭게 남기고 싶은 추억을 작성해주세요:)'
                            />
                        </Stack>
                        <Stack ref={writerRef}>
                            <Writer
                                fwriter={writer}
                                setfwriter={setWriter}
                            ></Writer>
                        </Stack>
                        <RecordSaveButton></RecordSaveButton>
                    </form>
                </Stack>
            </Stack>
            <AlertModal
                open={openModal}
                onClose={handleCloseModal}
                buttonText='추억 전달하기'
                onButtonClick={handleAcceptModal}
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

export default GuestForm;

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

const titlestyle = {
    color: 'custom.white',
    float: 'left',
    margin: '2.25rem 1rem 1rem',
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
