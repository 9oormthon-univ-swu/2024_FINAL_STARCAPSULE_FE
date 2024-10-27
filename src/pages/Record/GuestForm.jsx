import React, { useState, useRef } from 'react';
import { Stack, Typography } from '@mui/material';
import RecordBoard from './components/RecordBoard';
import RecordSaveButton from './components/RecordSaveButton';
import Writer from './components/Writer';
import RecordUpper from './components/RecordUpper';
import SnackBar from '@/components/SnackBar';
import AlertModal from '@/components/AlertModal';
import SelectSnowballObject from '@/components/SelectSnowballObject';
import useAxiosWithAuth from '@/utils/useAxiosWithAuth';
import { useParams, useNavigate } from 'react-router-dom';
import { useNicknameStore } from 'stores/useNicknameStore';
import Layout from '@/layouts/Layout';
import { Helmet } from 'react-helmet-async';

const GuestForm = () => {
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

    const { nickname } = useNicknameStore(); // {nickname, setNickname}

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

    //모달 확인 버튼 처리 함수&데이터전달
    const axiosInstance = useAxiosWithAuth();
    const handleAcceptModal = async () => {
        // FormData 객체를 사용해 이미지 파일과 텍스트 데이터를 서버로 전송
        const formData = new FormData();
        formData.append('image', uploadedImage);

        console.log('answer:', answer);
        console.log('image:', uploadedImage);
        console.log('writer:', writer);
        console.log('object_name:', object_name);

        await axiosInstance
            .post(`/api/share_memory/${params.userId}/write`, formData, {
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
            })
            .then(() => {
                navigate(`/complete/${params.userId}`);
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
        if (!object_name) {
            setOpenSnackbar(true); //장식이 없을 경우 스낵바 True
            setSnackbarText('장식이 선택되지 않았어요.');
            selectObjectRef.current.scrollIntoView({ behavior: 'smooth' });
            return;
        } else if (!answer) {
            setOpenSnackbar(true); //기록한 내용이 없을 경우 스낵바 True
            setSnackbarText('추억이 작성되지 않았어요.');
            recordBoardRef.current.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        //장식이 없을 경우
        else if (!writer) {
            setOpenSnackbar(true); //작성자가 없을 경우 스낵바 True
            setSnackbarText('이름을 작성해주세요.');
            writerRef.current.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        //answer 있을 경우 모달 오픈
        setopenModal(true);
    };

    return (
        <Layout
            snow
            overlay
            sx={{
                py: 3,
            }}
        >
            <Helmet>
                <title>스노로그 - 추억 전달</title>
                <meta name='description' content='추억을 공유해보세요.' />
                <meta property='og:title' content='스노로그 - 추억 전달' />
                <meta property='og:description' content='추억을 공유해보세요' />
                <meta property='og:type' content='website' />
            </Helmet>
            <Stack sx={contentstyle}>
                <Stack>
                    <Stack ref={selectObjectRef}>
                        <RecordUpper sx={{ textAlign: 'left' }}></RecordUpper>
                    </Stack>
                    <Stack>
                        <SelectSnowballObject
                            snowballObject={object_name}
                            setSnowballObject={setObjectName}
                            mine={false}
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
                                showplaceholder='남기고 싶은 추억을 작성해주세요.'
                            />
                        </Stack>
                        <Stack ref={writerRef}>
                            <Writer
                                fwriter={writer}
                                setfwriter={setWriter}
                            ></Writer>
                        </Stack>
                        <RecordSaveButton recordsavebtnText='추억 전달하기' />
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
        </Layout>
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
