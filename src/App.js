import './App.css';
import { ThemeProvider, Typography } from '@mui/material';
import theme from './constants/theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Typography variant='subtitle3'>Hello, World!</Typography>
        </ThemeProvider>
    );
}

export default App;

