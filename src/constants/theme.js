import { createTheme } from '@mui/material/styles';
import palette from '@/constants/palette.js';
import textStyles from '@/constants/textStyles.js';

const theme = createTheme({
    palette: {
        custom: palette,
    },
    typography: {
        fontFamily: [
            'Noto Sans',
            'Griun NltoTAENGG',
            'Rochester',
            'Bigshot One',
            'Kings',
            'Pretendard',
            'Kaisei Decol',
        ].join(','),
        ...textStyles,
        fontSize: 16,
    },
});

export default theme;
