import React, { useState, useRef, useEffect } from 'react';
import { Stack, Typography } from '@mui/material';
import RecordBoard from './components/RecordBoard';
import RecordSaveButton from './components/RecordSaveButton';
import Writer from './components/Writer';
import RecordUpper from './components/RecordUpper';
import AlertModal from '@/components/AlertModal';
import SelectSnowballObject from '@/components/SelectSnowballObject';
import { useParams, useNavigate } from 'react-router-dom';
import { useNicknameStore } from 'stores/useNicknameStore';
import Layout from '@/layouts/Layout';
import { Helmet } from 'react-helmet-async';
import { useSnackbarStore } from '@/stores/useSnackbarStore';
import { useUserStore } from '@/stores/useUserStore';
import axios from 'axios';

const GuestForm = () => {
    // useState로 상태 관리
    const [answer, setAnswer] = useState('');
    const [inputCount, setInputCount] = useState(0);
    const [writer, setWriter] = useState('');
    const [uploadedImage, setUploadedImage] = useState(null);
    const [object_name, setObjectName] = useState('');
    const [openModal, setOpenModal] = useState(false);
    // RecordBoard 참조 (자동스크롤)
    const recordBoardRef = useRef(null); // RecordBoard 참조
    const writerRef = useRef(null); //Writer 참조
    const selectObjectRef = useRef(null);

    const { setSnackbarOpen } = useSnackbarStore();

    const params = useParams();
    const navigate = useNavigate();

    const { nickname } = useNicknameStore(); // {nickname, setNickname}
    const { userId } = useUserStore();

    useEffect(() => {
        if (params.userId === userId) {
            navigate(`/record/${userId}`);
        }
    }, []);

    // 업로드 파일 관리
    const handleSetImage = (uploadedImage) => {
        setUploadedImage(uploadedImage);
    };

    // 텍스트 변경 및 글자수 계산 처리 함수
    const handleAnswerChange = (e) => {
        if (e.target.value.length <= 200) {
            setAnswer(e.target.value.slice(0, 199));
            setInputCount(e.target.value.length);
        } else {
            setInputCount(200);
        }
    };

    //모달 확인 버튼 처리 함수&데이터전달
    const handleAcceptModal = async () => {
        // FormData 객체를 사용해 이미지 파일과 텍스트 데이터를 서버로 전송
        const formData = new FormData();
        if (uploadedImage) formData.append('image', uploadedImage);

        //console.log('answer:', answer);
        //console.log('image:', uploadedImage);
        //console.log('writer:', writer);
        // console.log('object_name:', object_name);

        await axios
            .post(`/api/share_memory/${params.userId}/write`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                params: {
                    title: writer,
                    answer: answer,
                    object_name: object_name,
                    writer: writer,
                },
            })
            .then(() => {
                navigate(`/complete/${params.userId}`);
            })
            .catch((error) => {
                // console.log(error);
                setSnackbarOpen({
                    severity: 'error',
                    text: '추억 전달에 실패했어요. 다시 시도해주세요.',
                });
            });
    };

    // 모달 닫기 처리 함수
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    // 폼 제출 처리 함수
    const handleSubmit = (e) => {
        e.preventDefault();

        // 폼 데이터 확인
        if (!object_name) {
            setSnackbarOpen({
                severity: 'warning',
                text: '장식이 선택되지 않았어요.',
            });
            selectObjectRef.current.scrollIntoView({ behavior: 'smooth' });
            return;
        } else if (!answer) {
            setSnackbarOpen({
                severity: 'warning',
                text: '추억이 작성되지 않았어요.',
            });
            recordBoardRef.current.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        //장식이 없을 경우
        else if (!writer) {
            setSnackbarOpen({
                severity: 'warning',
                text: '이름을 작성해주세요.',
            });
            writerRef.current.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        localStorage.setItem('selectedObject', object_name);

        //answer 있을 경우 모달 오픈
        setOpenModal(true);
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
                            TO.&nbsp;
                            <span style={{ color: '#C3DEF7' }}>{nickname}</span>
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
    minHeight: '100dvh',
};

const titlestyle = {
    color: 'custom.white',
    '& span': {
        color: 'custom.main2',
    },
    float: 'left',
    margin: '2.25rem 1rem 1rem',
};

const modaltextstyle1 = {
    fontFamily: 'Noto Sans',
    fontSize: '0.92rem',
    fontWeight: '700',
    textAlign: 'center',
    color: '#6485CF',
};
const modaltextstyle2 = {
    fontFamily: 'Noto Sans',
    fontSize: '0.92rem',
    fontWeight: '700',
    textAlign: 'center',
    color: 'custom.font',
};
