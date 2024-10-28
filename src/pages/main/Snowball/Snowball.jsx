import React from 'react';
import { Backdrop, CircularProgress, styled } from '@mui/material';
import SnowballChip from './SnowballChip';
import SnowballObject from './SnowballObject';
import MemoryCount from './MemoryCount';
import NavigationButton from './NavigationButton';
import { motion, AnimatePresence } from 'framer-motion';

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

// memories: [{ id, writer_name, object_name }]
const Snowball = ({
    current,
    total,
    received,
    self,
    memories = [],
    onLeftClick,
    onRightClick,
    isLoading,
    onMemoryClick, // onMemoryClick prop 추가
}) => {
    const memoryPosition = [
        { bottom: '25%', right: '20%' },
        { top: '42%', left: '9%' },
        { top: '35.3%', right: '2.5%' },
        { top: '32.5%', left: '38%' },
        { top: '18%', left: '12%' },
        { top: '11%', right: '18%' },
    ];

    return (
        <SnowballContainer>
            <SnowballBackground>
                <SnowballChip current={current} total={total} />
                <AnimatePresence mode='wait'>
                    {isLoading && (
                        <Backdrop open={isLoading}>
                            <CircularProgress
                                sx={{
                                    color: 'custom.main1',
                                }}
                            />
                        </Backdrop>
                    )}
                    <motion.div
                        variants={snowballContainerVariants}
                        initial='initial'
                        animate='animate'
                        exit='exit'
                        key={current}
                    >
                        {memories.length > 0 &&
                            memories.map((memory, index) => (
                                <motion.div
                                    key={memory.id}
                                    variants={snowballObjectVariants}
                                    style={{
                                        position: 'absolute',
                                        ...memoryPosition[index],
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
                                        black={index === 0}
                                    />
                                </motion.div>
                            ))}
                    </motion.div>
                </AnimatePresence>
                <NavigationButton
                    current={current}
                    total={total}
                    onLeftClick={onLeftClick}
                    onRightClick={onRightClick}
                />
                <MemoryCount received={received} self={self} />
            </SnowballBackground>
        </SnowballContainer>
    );
};

export default Snowball;
