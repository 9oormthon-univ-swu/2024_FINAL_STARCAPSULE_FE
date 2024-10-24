import React, { useEffect } from 'react';
// import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Calendar from './Calendar/Calendar';
// import CloseIcon from '../../components/icons/CloseIcon';
import Layout from '@/layouts/Layout';
import { Stack } from '@mui/material';
import useSWR from 'swr';
import useAxiosWithAuth from '@/utils/useAxiosWithAuth';
import Loading from '@/components/Loading';

// const Header = styled.div`
//     top: 20px;
//     left: 20px;
//     right: 20px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     z-index: 10000;
// `;

// const StyledCloseIcon = styled(CloseIcon)`
//     fill: #d5d1cd;
// `;

// const CloseButton = styled.button`
//     background: none;
//     border: none;
//     cursor: pointer;
//     position: absolute;
//     top: 26px;
//     margin-left: -490px;
//     color: #d5d1cd;
// `;

// const TitleWrapper = styled.div`
//     text-align: center;
//     margin-top: 110px;
//     margin-left: -220px;
// `;

// const Title = styled.h1`
//     color: var(--grey, #d5d1cd);
//     font-family: 'Noto Sans';
//     font-size: 16px;
//     font-style: normal;
//     font-weight: 400;
//     line-height: normal;
// `;

// const SubTitle = styled.p`
//     color: var(--white, #fffcfa);
//     font-family: 'Noto Sans';
//     font-size: 20px;
//     font-style: normal;
//     font-weight: 700;
//     line-height: normal;
//     margin-left: -83px;
//     margin-top: 5px;
// `;

const CalendarPage = () => {
    const navigate = useNavigate();

    const axiosWithAuth = useAxiosWithAuth();

    const fetcher = (url) =>
        axiosWithAuth.get(url).then((res) => res.data.result);

    const { data, isLoading } = useSWR(`/calendar/data`, fetcher, {
        onError: (error) => {
            console.log(error);
        },
    });

    useEffect(() => {
        console.log(data);
    }, [data]);

    // const handleClose = () => {
    //     navigate(-1);
    // };

    if (isLoading) return <Loading />;

    return (
        <Layout snow overlay>
            <Stack
                sx={{
                    width: '100%',
                    height: '100vh',
                }}
                direction={'column'}
                justifyContent={'center'}
                alignContent={'center'}
            >
                {/* <Header>
                    <CloseButton onClick={handleClose}>
                        <StyledCloseIcon
                            style={{ width: '30px', height: '30px' }}
                        />
                    </CloseButton>
                    <TitleWrapper>
                        <Title>당신의 추억을 모아 퍼즐을 완성하세요!</Title>
                        <SubTitle>보관된 추억 조각 0개</SubTitle>
                    </TitleWrapper>
                </Header> */}

                <Calendar
                    serverTime={data.serverTime}
                    hasWritten={data.writtenArray}
                />
            </Stack>
        </Layout>
    );
};

export default CalendarPage;
