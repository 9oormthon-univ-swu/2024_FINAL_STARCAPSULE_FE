import { Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import DDayTitle from '@/pages/main/DDayTitle';
import Snowball from '@/pages/main/Snowball/Snowball';
import Layout from '@/layouts/Layout';
import useSWR from 'swr';
import Loading from '@/components/Loading';
import { StyledButton, MainContainer } from '@/pages/main/Main';
import Title from './Title';
import { useParams, useNavigate } from 'react-router-dom';
// import { defaultGetFetcher } from '@/utils/getFetcher';
import { getDaysBeforeOpen } from '@/utils/getDaysBeforeOpen';
import axios from 'axios';
import { useNicknameStore } from 'stores/useNicknameStore';

// 1. data를 가져온다. < -
// 2. data->snowball_name 전역 상태 변수로 저장
// 3. gest-form에서 쓴다.

// TODO : 전역 상태 변수를 만든다.
// TODO : get fetcher를 새로 만들어서 끝에 set
// TODO : guest-form에서 쓴다.

const Guest = () => {
    const [page, setPage] = useState(1);
    const params = useParams();
    const navigate = useNavigate();
    const param = useParams();

    //스노우볼 주인의 닉네임 설정
    const { setNickname } = useNicknameStore();
    const nicknameGetFetcher = async (url) => {
        const data = await axios
            .get(url)
            .then((res) => {
                console.log(res);
                setNickname(res.data.result.snowball_name);
                return res.data.result;
            })
            .catch((error) => {
                console(error);
            });
        return data;
    };

    const { data, isLoading, error } = useSWR(
        `${process.env.REACT_APP_API_URL}/api/capsule/${params.userId}?page=${page}`,
        nicknameGetFetcher, // (url) => fetch(url).then((res) => res.json()),
        {
            onError: (error) => {
                console.error(error);
            },
        }
    );

    const onLeftClick = () => {
        setTimeout(
            setPage((prev) => (prev === 1 ? 1 : prev - 1)),
            500
        );
    };

    const onRightClick = () => {
        setTimeout(
            setPage((prev) =>
                prev === data?.total_page ? data?.total_page : prev + 1
            ),
            500
        );
    };

    const onRecordClick = () => {
        navigate(`/guestrecord/${param.userId}`);
    };

    if (isLoading) return <Loading />;
    if (error) return <div>failed to load</div>;

    const daysLeft = getDaysBeforeOpen(data?.server_time, true);

    return (
        <Layout sx={{ overflow: 'hidden' }} snow snowflake>
            <MainContainer
                direction={'column'}
                justifyContent={'space-between'}
                alignContent={'center'}
                spacing={1}
            >
                <Stack direction={'column'} spacing={1} sx={{ flexGrow: 2 }}>
                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                    >
                        <DDayTitle />
                    </Stack>
                    <Title nickname={data?.snowball_name ?? ''} />
                </Stack>

                <Snowball
                    isLoading={isLoading}
                    memories={data?.memories}
                    current={data?.page}
                    total={data?.total_page}
                    received={data?.received}
                    self={data?.self}
                    onLeftClick={onLeftClick}
                    onRightClick={onRightClick}
                />
                {daysLeft ? (
                    <StyledButton
                        variant={'contained'}
                        sx={{
                            flexGrow: 0,
                        }}
                    >
                        <Typography variant='title2'>추억 전달하기</Typography>
                    </StyledButton>
                ) : (
                    <Stack
                        direction={'row'}
                        justifyContent={'space-between'}
                        spacing={'1rem'}
                        sx={{
                            flexGrow: 0,
                        }}
                    >
                        <StyledButton
                            variant={'contained'}
                            sx={{ flexGrow: 1, width: 'fit-content' }}
                        >
                            <Typography variant='title2'>팀 소개</Typography>
                        </StyledButton>
                        <StyledButton
                            onClick={onRecordClick}
                            variant={'contained'}
                            sx={{ flexGrow: 2, width: 'fit-content' }}
                        >
                            <Typography variant='title2'>
                                추억 보관하기
                            </Typography>
                        </StyledButton>
                    </Stack>
                )}
            </MainContainer>
        </Layout>
    );
};

export default Guest;
