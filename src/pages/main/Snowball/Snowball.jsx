import React from 'react';
import SnowballImage from '@/assets/snowball_image.svg';
import { styled } from '@mui/material';
import SnowballChip from './SnowballChip';
import SnowballObject from './SnowballObject';
import MemoryCount from './MemoryCount';
import NavigationButton from './NavigationButton';

const SnowballContainer = styled('div')(({ theme }) => ({
    color: theme.palette.custom.white,
    backgroundImage: `url(${SnowballImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    aspectRatio: '5/6',
    position: 'relative',
}));

// memories: [{ id, writer_name, object_name }]
const Snowball = ({ current, total, received, self, memories }) => {
    const memoryPosition = [
        { bottom: '25%', right: '20%' },
        { top: '42%', left: '9%' },
        { top: '35.3%', right: 0 },
        { top: '32.5%', left: '38%' },
        { top: '18%', left: '12%' },
        { top: '11%', right: '18%' },
    ];
    return (
        <SnowballContainer>
            <SnowballChip current={current} total={total} />
            {memories.map((memory, index) => (
                <SnowballObject
                    key={memory.id}
                    writer={memory.writer_name}
                    variant={memory.object_name}
                    sx={memoryPosition[index]}
                    black={index == 0}
                />
            ))}
            <NavigationButton />
            <MemoryCount received={received} self={self} />
        </SnowballContainer>
    );
};

export default Snowball;
