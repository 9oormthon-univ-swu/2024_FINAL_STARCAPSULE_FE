import { createTheme } from '@mui/material';

const palette = {
    button1: '#7F5539',
    button2: '#63422C',
    main1: '#B08F79',
    main2: '#DDB892',
    font: '#282828',
    grey: '#D5D1CD',
    white: '#FFFCFA',
};

// createTheme 함수에서 theme을 확장하여 사용자 정의 색상 추가
const theme = createTheme({
    palette: {
        custom: {
            main1: palette.main1,
            main2: palette.main2,
            font: palette.font,
            grey: palette.grey,
            button1: palette.button1,
            button2: palette.button2,
            white: palette.white,
        },
    },
});

export default theme;
export { palette };
