import { Button } from '@mui/material'
import { styled } from '@mui/material/styles'

const CustomButton = styled(Button)(({ theme, variant }) => ({
	display: 'flex',
	height: 'fit-content',
	padding: '0.75rem 1rem',
	// whiteSpace: 'nowrap',
	boxShadow: variant === 'contained' ? theme.shadows[3] : '',

	background: variant === 'contained' ?
		`linear-gradient(296.13deg, ${theme.palette.primary.dark} 21.5%, ${theme.palette.primary.light} 76.69%);`
		:
		''
	,
	'&:disabled': {
		background: theme.palette.action.disabledBackground,
		color: theme.palette.action.disabled,
	},
}))

const CustomBtn1 = ({ children, variant = "contained", ...others }) => {
	return <CustomButton variant={variant} {...others}>
		{children}
	</CustomButton>
}

export default CustomBtn1;