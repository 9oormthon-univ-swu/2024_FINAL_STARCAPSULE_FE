import { createTheme } from '@mui/material/styles';
import palette from '@/constants/palette.js';
import textStyles from '@/constants/textStyles.js';

const theme = createTheme({
    palette: {
        custom: palette,
        action: {
            disabled: '#FFFCFAA0',
        },
        primary: {
            main: palette.main1,
            light: palette.main2,
        },
        text: {
            primary: palette.white,
            secondary: palette.grey,
        },
    },
    typography: {
        fontFamily: [
            'Noto Sans',
            'Griun NltoTAENGGU',
            'Rochester',
            'Bigshot One',
            'Kings',
            'Pretendard',
            'Kaisei Decol',
        ].join(','),
        ...textStyles,
    },
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    Heading1: 'h1',
                    Heading2: 'h2',
                    title: 'h3',
                    title1: 'h3',
                    title2: 'h4',
                    title3: 'h4',
                    title4: 'h5',
                    subtitle1: 'h6',
                    subtitle2: 'h6',
                    subtitle3: 'h6',
                    subtitle4: 'h6',
                    body1: 'p',
                    body2: 'p',
                    body3: 'p',
                    body4: 'p',
                    body5: 'p',
                    caption: 'p',
                    number1: 'p',
                    number2: 'p',
                    number3: 'p',
                    number4: 'p',
                    number5: 'p',
                    number6: 'p',
                    number7: 'p',
                    number8: 'p',
                    number9: 'p',
                },
            },
            styleOverrides: {
                root: {
                    color: palette.font,
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    color: palette.white,
                },
            },
        },
    },
});

export default theme;
