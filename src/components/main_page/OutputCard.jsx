import React from 'react';
import { Box, Paper, Typography } from '@mui/material'
import { FlagCircleOutlined } from '@mui/icons-material';
// import { styled, useTheme } from '@mui/material/styles'


const OutputCard = ({ IconFlag, data, ...others }) => {
	let FlagComponent = IconFlag;

	return (
		<Box className='flex flex-col space-y-2' {...others}>
			<Typography variant='caption'>05.03.23    19:58   -   ai generated content</Typography>
			<Typography variant='h4'>{data.heading}</Typography>
			<div className='flex items-center space-x-4'>
				{FlagComponent}
				<Typography variant='subtitle1'>{data.outline}</Typography>
			</div>
			<Typography>{data.content}</Typography>
		</Box>
	)
}
OutputCard.defaultProps = {
	IconFlag: <FlagCircleOutlined />,
	data: {
		heading: 'string',
		outline: 'string',
		content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et e',
		keywords: 'string',
		date: 'string',
	},
}

export default OutputCard;