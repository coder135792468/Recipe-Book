import { createTheme, ThemeProvider } from '@material-ui/core/styles';
const theme = createTheme({
	palette: {
		primary: {
			main: '#3f51b5',
		},
		secondary: {
			main: '#f44336',
			contrastText: '#fff',
		},
	},
});

const Theme = ({ children }) => {
	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
