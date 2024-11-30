import React from 'react';
import { styled } from '@mui/material';
import SnowballChip from './SnowballChip';
import SnowballObject from './SnowballObject';
import MemoryCount from './MemoryCount';
import NavigationButton from './NavigationButton';
import { motion, AnimatePresence } from 'framer-motion';
import useSWR from 'swr';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SnowballContainer = styled('div')(() => ({
    padding: '0 0.375rem',
    height: 'fit-content',
    width: '100%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexGrow: 1,
}));

const SnowballBackground = styled('div')(({ theme }) => ({
    color: theme.palette.custom.white,
    backgroundImage: `url(${'/assets/snowball_image.svg'})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    maxWidth: '28rem',
    aspectRatio: '5/6',
    position: 'relative',
}));

const snowballContainerVariants = {
    animate: {
        transition: {
            staggerChildren: 0.2, // 각 SnowballObject가 0.2초 간격으로 나타남
        },
    },
};

const snowballObjectVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
};

const memoryPosition = [
    { bottom: '25%', right: '20%', zIndex: 56 },
    { top: '42%', left: '9%', zIndex: 55 },
    { top: '35.3%', right: '2.5%', zIndex: 54 },
    { top: '32.5%', left: '38%', zIndex: 53 },
    { top: '18%', left: '12%', zIndex: 52 },
    { top: '11%', right: '18%', zIndex: 51 },
];

const Snowball = ({ received, self, onMemoryClick, fetcher }) => {
    const params = useParams();
    const [searchParams] = useSearchParams();
    const page = parseInt(searchParams.get('page') || 1);
    const [totalPage, setTotalPage] = useState(page);

    const navigate = useNavigate();

    const { data, isLoading } = useSWR(
        `${import.meta.env.VITE_API_URL}/api/capsule/${params.userId}/pagination?page=${page}`,
        fetcher
    );

    useEffect(() => {
        if (data) {
            setTotalPage(data.total_page);
        }
    }, [data]);

    const onLeftClick = () => {
        if (page === 1) return;
        navigate(`/main/${params.userId}?page=${page - 1}`);
    };

    const onRightClick = () => {
        if (page === totalPage) return;
        navigate(`/main/${params.userId}?page=${page + 1}`);
    };

    return (
        <SnowballContainer>
            <SnowballBackground>
                <SnowballChip current={page} total={totalPage} />
                {!isLoading && (
                    <AnimatePresence>
                        <motion.div
                            variants={snowballContainerVariants}
                            initial='initial'
                            animate='animate'
                            exit='exit'
                            key={page}
                        >
                            {data.memories.length > 0 &&
                                data.memories.map((memory, index) => (
                                    <motion.div
                                        key={memory.id}
                                        variants={snowballObjectVariants}
                                        style={{
                                            position: 'absolute',
                                            ...memoryPosition[index],
                                            minWidth: '5rem',
                                            width: '27%',
                                            maxWidth: '10rem',
                                        }}
                                        onClick={() =>
                                            onMemoryClick(
                                                memory.id,
                                                memory.object_name
                                            )
                                        } // memory.id와 memory.object_name을 함께 전달
                                    >
                                        <SnowballObject
                                            key={memory.id}
                                            id={memory.id}
                                            writer={memory.writer_name}
                                            variant={memory.object_name}
                                        />
                                    </motion.div>
                                ))}
                        </motion.div>
                    </AnimatePresence>
                )}
                <NavigationButton
                    current={page}
                    total={totalPage}
                    onLeftClick={onLeftClick}
                    onRightClick={onRightClick}
                />
                <MemoryCount received={received} self={self} />
            </SnowballBackground>
        </SnowballContainer>
    );
};

export default Snowball;
