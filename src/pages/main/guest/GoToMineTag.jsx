import { ChevronRightIcon } from '@/components/icons';
import { Chip, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const GoToMineTag = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/');
    };
    return (
        <Chip
            label={
                <Stack direction={'row'} alignItems={'center'}>
                    <Typography variant={'body5'}>
                        {'내 스노우볼로 돌아가기'}
                    </Typography>
                    <ChevronRightIcon
                        sx={{
                            color: 'custom.font',
                            width: '1.1875rem',
                            height: '1.1875rem',
                        }}
                    />
                </Stack>
            }
            onClick={handleClick}
            sx={{
                width: 'fit-content',
                backgroundColor: '#FFFCFA99',
                pl: '0.75rem',
                pr: '0.5rem',
                height: '1.75rem',
                '& span': {
                    padding: 0,
                },
            }}
        />
    );
};

export default GoToMineTag;
