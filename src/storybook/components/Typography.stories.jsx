import React from 'react';
import { Box, Typography } from '@mui/material';

const meta = {
    title: 'components/Typography',
    component: Typography,
    argTypes: {
        variant: {
            control: {
                type: 'select',
            },
            options: [
                'Heading1',
                'Heading2',
                'title',
                'title1',
                'title2',
                'title3',
                'title4',
                'subtitle1',
                'subtitle2',
                'subtitle3',
                'subtitle4',
                'body1',
                'body2',
                'body3',
                'body4',
                'body5',
                'caption',
                'number1',
                'number2',
                'number3',
                'number4',
                'number5',
                'number6',
                'number7',
                'number8',
                'number9',
            ],
        },
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <Box sx={{ color: 'custom.main2' }}>
                <Story />
            </Box>
        ),
    ],
};

// 모든 variant에 대한 스토리 정의
const Heading1 = {
    args: {
        variant: 'Heading1',
        children: 'Heading1',
    },
};

const Heading2 = {
    args: {
        variant: 'Heading2',
        children: 'Heading2',
    },
};

const Title = {
    args: {
        variant: 'title',
        children: 'Title',
    },
};

const Title1 = {
    args: {
        variant: 'title1',
        children: 'Title1',
    },
};

const Title2 = {
    args: {
        variant: 'title2',
        children: 'Title2',
    },
};

const Title3 = {
    args: {
        variant: 'title3',
        children: 'Title3',
    },
};

const Title4 = {
    args: {
        variant: 'title4',
        children: 'Title4',
    },
};

const Subtitle1 = {
    args: {
        variant: 'subtitle1',
        children: 'Subtitle1',
    },
};

const Subtitle2 = {
    args: {
        variant: 'subtitle2',
        children: 'Subtitle2',
    },
};

const Subtitle3 = {
    args: {
        variant: 'subtitle3',
        children: 'Subtitle3',
    },
};

const Subtitle4 = {
    args: {
        variant: 'subtitle4',
        children: 'Subtitle4',
    },
};

const Body1 = {
    args: {
        variant: 'body1',
        children: 'Body1',
    },
};

const Body2 = {
    args: {
        variant: 'body2',
        children: 'Body2',
    },
};

const Body3 = {
    args: {
        variant: 'body3',
        children: 'Body3',
    },
};

const Body4 = {
    args: {
        variant: 'body4',
        children: 'Body4',
    },
};

const Body5 = {
    args: {
        variant: 'body5',
        children: 'Body5',
    },
};

const Caption = {
    args: {
        variant: 'caption',
        children: 'Caption',
    },
};

const Number1 = {
    args: {
        variant: 'number1',
        children: 'Number1',
    },
};

const Number2 = {
    args: {
        variant: 'number2',
        children: 'Number2',
    },
};

const Number3 = {
    args: {
        variant: 'number3',
        children: 'Number3',
    },
};

const Number4 = {
    args: {
        variant: 'number4',
        children: 'Number4',
    },
};

const Number5 = {
    args: {
        variant: 'number5',
        children: 'Number5',
    },
};

const Number6 = {
    args: {
        variant: 'number6',
        children: 'Number6',
    },
};

const Number7 = {
    args: {
        variant: 'number7',
        children: 'Number7',
    },
};

const Number8 = {
    args: {
        variant: 'number8',
        children: 'Number8',
    },
};

const Number9 = {
    args: {
        variant: 'number9',
        children: 'Number9',
    },
};

export default meta;
export {
    Heading1,
    Heading2,
    Title,
    Title1,
    Title2,
    Title3,
    Title4,
    Subtitle1,
    Subtitle2,
    Subtitle3,
    Subtitle4,
    Body1,
    Body2,
    Body3,
    Body4,
    Body5,
    Caption,
    Number1,
    Number2,
    Number3,
    Number4,
    Number5,
    Number6,
    Number7,
    Number8,
    Number9,
};
