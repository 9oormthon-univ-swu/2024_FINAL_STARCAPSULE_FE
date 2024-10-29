import React, { useState, useRef } from 'react';
import { Stack, Typography } from '@mui/material';
import RecordBoard from './components/RecordBoard';
import RecordSaveButton from './components/RecordSaveButton';
import RecordTitle from './components/RecordTitle';
import RecordUpper from './components/RecordUpper';
import SnackBar from '@/components/SnackBar';
import AlertModal from '@/components/AlertModal';
import { useNavigate, useParams } from 'react-router-dom';
import SelectSnowballObject from '@/components/SelectSnowballObject';
import useAxiosWithAuth from '@/utils/useAxiosWithAuth';
import Layout from '@/layouts/Layout';
import { Helmet } from 'react-helmet-async';

const RecordForm = () => {
    const navigate = useNavigate();
    const { userId } = useParams();

    // useState로 상태 관리
    const [title, setTitle] = useState('');
    const [answer, setAnswer] = useState('');
    const [inputCount, setInputCount] = useState(0);
    const [image, setImage] = useState(null);
    const [object_name, setObjectName] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarText, setSnackbarText] = useState('');
    const [openModal, setopenModal] = useState(false);

    // RecordBoard 참조 (자동스크롤)
    const recordBoardRef = useRef(null); // RecordBoard 참조
    const selectObjectRef = useRef(null); // SelectSnowballObject 참조

    // 업로드 파일 관리
    const handleSetImage = (image) => {
        console.log('Setting image:', image);
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
        const formData = new FormData();
        if (image) formData.append('image', image);

        console.log('answer:', answer);
        console.log('image:', image);
        console.log('title:', title);
        console.log('object_name:', object_name);

        await axiosInstance
            .post(`/api/my_memory/write`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    title: title,
                    answer: answer,
                    object_name: object_name,
                },
            })
            .then(() => {
                navigate(`/mycomplete/${userId}`);
                console.log('Memory successfully uploaded');
            })
            .catch((error) => {
                console.log('Error:', error);
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
            setOpenSnackbar(true); // 장식이 선택되지 않았을 경우
            setSnackbarText('장식이 선택되지 않았어요.');
            selectObjectRef.current.scrollIntoView({ behavior: 'smooth' });
            return;
        } else if (!answer) {
            setOpenSnackbar(true); // 추억이 작성되지 않았을 경우
            setSnackbarText('추억이 작성되지 않았어요.');
            recordBoardRef.current.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        // text가 있을 경우 모달 오픈
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
                <title>스노로그 - 추억 보관</title>
                <meta
                    name='description'
                    content='스노우볼에 추억으로 보관해보세요.'
                />
                <meta property='og:title' content='스노로그 - 추억 보관' />
                <meta
                    property='og:description'
                    content='스노우볼에 추억으로 보관해보세요.'
                />
                <meta property='og:type' content='website' />
            </Helmet>
            <Stack sx={contentstyle}>
                <Stack ref={selectObjectRef}>
                    <Stack>
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
                        <RecordTitle title={title} setTitle={setTitle} />
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
                        <RecordSaveButton recordsavebtnText='추억 보관하기' />
                    </form>
                </Stack>
            </Stack>
            <AlertModal
                open={openModal}
                onClose={handleCloseModal}
                buttonText='추억 보관하기'
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

export default RecordForm;

// Design
const contentstyle = {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '1.5rem',
    boxSizing: 'border-box',
    minHeight: '100vh',
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
