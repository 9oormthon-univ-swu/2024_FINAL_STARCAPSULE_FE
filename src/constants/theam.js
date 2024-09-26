import { createTheme } from '@mui/material/styles';
import { palette } from './palette';
import { textStyles } from './textStyles';

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
    },
});

export default theme;
