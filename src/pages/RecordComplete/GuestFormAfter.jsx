import React, { useEffect, useRef, useState } from 'react';
import { Stack } from '@mui/material';
import RecordBoard from '../Record/components/RecordBoard';
import ImageSaveButton from './ImageSaveButton'; 
import html2canvas from 'html2canvas';
import CloseIcon from '@/components/icons/closeicon'; 
import { ShareIcon } from '@/components/icons';
import useAxiosWithAuth from '@/utils/useAxiosWithAuth';
import { useParams, useNavigate } from 'react-router-dom';

const contentstyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', 
    minHeight: '100vh', 
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0', 
    boxSizing: 'border-box',
    position: 'relative',
    overflow: 'hidden', 
};

const GuestFormAfter = () => {
    const captureRef = useRef(null); 
    const { userId, memoryId } = useParams(); 
    const navigate = useNavigate();
    const axiosInstance = useAxiosWithAuth();
    const [memoryData, setMemoryData] = useState(null);

    const snowballAPI = `${import.meta.env.VITE_API_URL}/api/share_memory`; 
    const token = localStorage.getItem('token'); 

    useEffect(() => {
        const fetchMemoryData = async () => {
            try {
                console.log('User ID:', userId);  // userId 출력
                console.log('Memory ID:', memoryId);  // memoryId 출력
        
                if (!memoryId || !userId) {
                    console.error('User ID or Memory ID is missing');
                    return;
                }
        
                const requestUrl = `${snowballAPI}/${userId}/${memoryId}`;
                console.log(`Request URL: ${requestUrl}`);
        
                const response = await axiosInstance.get(requestUrl);
        
                console.log('Fetched Memory Data:', response.data);
                setMemoryData(response.data);
            } catch (error) {
                console.error('Error fetching memory details:', error);
            }
        };
        
        
    
        fetchMemoryData();
    }, [memoryId, userId, axiosInstance, token]);

    const handleSaveImage = (e) => {
        e.preventDefault();
        if (captureRef.current) {
            const element = captureRef.current;
            const scale = 2;

            html2canvas(element, {
                scale: scale,
                useCORS: true,
                backgroundColor: null,
            }).then((canvas) => {
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = 'record.png';
                link.click();
            }).catch((error) => {
                console.error('이미지 저장 중 오류 발생:', error);
            });
        }
    };

    const handleClose = () => {
        navigate(`/main/${userId}`);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        return (
            <span style={{ fontSize: '1.4rem' }}>
                <span style={{ color: '#DDB892' }}>{year}</span>년&nbsp;
                <span style={{ color: '#DDB892' }}>{month}</span>월&nbsp;
                <span style={{ color: '#DDB892' }}>{day}</span>일
            </span>
        );
    };

    return (
        <Stack sx={contentstyle}>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    position: 'absolute',
                    top: 'calc(1rem + 30px)',
                    left: '1rem',
                    right: '1rem',
                    zIndex: 10,
                    color: 'white',
                    fontFamily: 'Griun NltoTAENGGU, sans-serif',
                }}
            >
                <CloseIcon 
                    sx={{ cursor: 'pointer', position: 'relative', right: '-30px' }} 
                    onClick={handleClose} 
                />
                <span style={{ fontSize: '1.4rem' }}>
                    {memoryData ? formatDate(memoryData.result.createAt) : "로딩 중..."}
                </span>
                <ShareIcon sx={{ cursor: 'pointer', position: 'relative', left: '-30px' }} />
            </Stack>

            <Stack 
                ref={captureRef} 
                sx={{
                    width: '100%',
                    height: '100vh', 
                    padding: '1.5rem', 
                    boxSizing: 'border-box',
                    background: 'linear-gradient(180deg, #0b0a1b 0%, #27405e 100%)',
                    position: 'absolute',
                    overflow: 'hidden',
                    paddingTop: '12rem',
                }}
            >
                <span style={{
                    position: 'absolute',
                    top: 'calc(10px + 9rem)', 
                    left: '9.5rem',
                    color: 'white',
                    fontSize: '1.3rem',
                    fontFamily: 'Griun NltoTAENGGU, sans-serif',
                }}>
                    To. <span style={{ color: '#DDB892' }}>{memoryData?.result?.nickname || '닉네임'}</span>
                </span>

                <RecordBoard
                    content={memoryData?.result.answer || ""}
                    imageUrl={memoryData?.result.imageUrl}
                    isReadOnly={true}
                />

                <span style={{
                    position: 'absolute',
                    bottom: 'calc(10px + 16rem)',
                    right: '9.5rem', 
                    color: 'white',
                    fontSize: '1.3rem',
                    fontFamily: 'Griun NltoTAENGGU, sans-serif',
                }}>
                    From. <span style={{ color: '#DDB892' }}>{memoryData?.result?.writer || '작성자'}</span>
                </span>
            </Stack>

            <Stack 
                component="form" 
                sx={{
                    position: 'relative',
                    marginTop: '-22rem',
                }}
            >
                <ImageSaveButton onClick={handleSaveImage} />
            </Stack>
        </Stack>
    );
};

export default GuestFormAfter;
