// Light Background: #F3F6F5
// Light Accent: #9DFFF2
// Bright Accent: #FF6724
// Brand Tone: #263151
// Dark Accent: #C46349



import { createTheme } from '@mui/material/styles';

// THIS OBJECT SHOULD BE SIMILAR TO ../tailwind.config.js
const themeConstants = {
	breakpoints: {
		xs: 0,
		mb: 350,
		sm: 600,
		md: 960,
		lg: 1280,
		xl: 1920,
	},
}

// Check here for more configurations https://material-ui.com/customization/default-theme/
const theme = createTheme({
	palette: {
		background: {
			paper: '#fff',
			default: '#f7f9fb'
		},
		text: {
			primary: "#020202",
			secondary: '#1C0C37',
			disabled: '#B1B5B9'
		},
		primary: {
			main: '#7052DA',
			light: '#8550DA',
			dark: '#5056DA',
			contrastText: '#fff'
		},
		secondary: {
			main: '#006494',
			light: '#0d99ff',
			dark: '#004262',
			contrastText: '#fff'
		},

		// divider: '#E4E7E8',
		divider: '#d5d5d5',
		action: {
			active: '#6B7280',
			focus: 'rgba(55, 65, 81, 0.12)',
			hover: 'rgba(55, 65, 81, 0.04)',
			selected: 'rgba(55, 65, 81, 0.08)',
			disabledBackground: 'rgba(55, 65, 81, 0.12)',
			disabled: 'rgba(55, 65, 81, 0.26)'
		},
	},
	breakpoints: {
		values: themeConstants.breakpoints,
	},
	typography: {
		fontFamily: '"Poppins", sans-serif',
		fontSize: 14,
		fontWeightRegular: 400,
		fontWeightLight: 300,
		fontWeightMedium: 500,
		fontWeightBold: 700,
		htmlFontSize: 16,

		button: { fontFamily: 'Inter, sans-serif', fontWeight: 500, fontSize: "0.875rem", lineHeight: 1.75, letterSpacing: "0.02857em", textTransform: "uppercase" },
		body1: { fontWeight: 400, fontSize: '1rem', lineHeight: 1.5, letterSpacing: '0.00938em' },
		body2: { fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.43, letterSpacing: '0.01071em' },
		subtitle1: {
			color: '#000', fontFamily: 'Inter', fontWeight: 1000,
			fontSize: '1rem', lineHeight: 1.375, letterSpacing: '0.00938em'
		},
		subtitle2: {
			color: '#2D3748', fontWeight: 700,
			fontSize: '0.875rem', lineHeight: 1.57, letterSpacing: '0.00714em'
		},
		caption: { fontWeight: 400, fontSize: '0.75rem', lineHeight: 1.66, letterSpacing: '0.03333em' },
		overline: { fontWeight: 400, fontSize: "0.75rem", lineHeight: 2.66, letterSpacing: "0.08333em", textTransform: "uppercase" },
		h1: { fontWeight: 300, fontSize: '6rem', lineHeight: 1.167, letterSpacing: '-0.01562em' },
		h2: { fontWeight: 300, fontSize: '3.75rem', lineHeight: 1.2, letterSpacing: '-0.00833em' },
		h3: { fontWeight: 400, fontSize: '3rem', lineHeight: 1.167, letterSpacing: '0em' },
		h4: {
			color: '#1C0C37', fontWeight: 700,
			fontSize: '2.125rem', lineHeight: 1.235, letterSpacing: '0.00735em'
		},
		h5: { fontWeight: 400, fontSize: '1.5rem', lineHeight: 1.334, letterSpacing: '0em' },
		h6: { fontWeight: 500, fontSize: '1.25rem', lineHeight: 1.6, letterSpacing: '0.0075em' },
	},
	components: {
		MuiButton: {
			defaultProps: {
				// disableElevation: true,
				// disableFocusRipple: true,
			},
			styleOverrides: {
				root: {
					textTransform: 'capitalize',
					borderRadius: 8,
					// padding: '0.5rem 1rem',
				}
			}
		},
		MuiCssBaseline: {
			styleOverrides: {
				'*': {
					boxSizing: 'border-box',
					margin: 0,
					padding: 0
				},
				html: {
					MozOsxFontSmoothing: 'grayscale',
					WebkitFontSmoothing: 'antialiased',
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100%',
					width: '100%',
					'& *': {
						'::-webkit-scrollbar': { width: '5px' },
						'::-webkit-scrollbar-track': { background: '#E4E7E8' },
						'::-webkit-scrollbar-thumb': { background: '#7052DA' },
						'::-webkit-scrollbar-thumb:hover': { background: '#8550DA' },
					}
				},
				body: {
					display: 'flex',
					flex: '1 1 auto',
					flexDirection: 'column',
					minHeight: '100%',
					width: '100%'
				}
			}
		}
	},
})

export default theme
