import { createTheme } from '@mui/material/styles';
import palette from '@/constants/palette.js';
import textStyles from '@/constants/textStyles.js';

const theme = createTheme({
    palette: {
        custom: palette,
        action: {
            disabled: '#FFFCFAA0',
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
});

export default theme;
