import MainRoute from './routes/MainRoute';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './global/components/NavBar';
import { CssBaseline } from '@mui/material';

const theme = createTheme();

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<CssBaseline />
				<NavBar />
				<MainRoute />
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
