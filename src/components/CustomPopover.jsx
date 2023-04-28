import React from 'react';

import { Box, Popover, IconButton, Typography, Divider } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'




const EditPopoverComponent = styled(Popover)(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: '0.5rem',
		'& > div': {
			display: 'flex',
			alignItems: 'center',
			padding: '0.5rem 1rem',
		}
	}
}))
const EditPopover = ({ children, ...others }) => {
	return (
		<EditPopoverComponent {...others}>
			{children}
		</EditPopoverComponent>
	)
}
export default EditPopover;

export const PopoverItem = ({ Icon, label, onClick, style, ...others }) => {
	return (
		<Box onClick={onClick} style={{ ...style, cursor: 'pointer' }}  {...others}>
			{Icon}
			<Typography variant='overline'>{label}</Typography>
		</Box>
	)
};