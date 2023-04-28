import React, { useState, MouseEvent } from 'react';
import { useAppSelector } from '../../store';

import { Box, Collapse, Divider, IconButton, Popover, Typography, CircularProgress } from "@mui/material";
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { styled, useTheme } from '@mui/material/styles'

import CustomBtn1 from "../CustomBtn1";
import ImgTrippleDot from '@assets/imgs/three-dots.svg';
import ImgPlay from '@assets/imgs/play.svg';


const CardBlockComponent = styled(Box)(({ theme }) => ({
	display: 'flex', flexDirection: 'column',
	background: theme.palette.background.paper,
	padding: '1rem 1.5rem',
	border: `1px solid ${theme.palette.divider}`,
	borderRadius: '1rem',
	'& > .card-cotainer': {
		display: 'flex',
		alignItems: 'center',
		'& > .card-title': { margin: '0 1.5rem', flexGrow: 1 },
	},
}))

const CardBlock = ({
	title, expanded,
	handleRunClick, handleEditClick,
	children, ...others
}) => {
	const _loading = useAppSelector((state) => state._setting.loading);

	const [isExpanded, setIsExpanded] = useState(expanded || false);
	const ExpandIcon = isExpanded ? ExpandLess : ExpandMore
	return (
		<CardBlockComponent {...others}>
			<div className='card-cotainer'>
				<ExpandIcon sx={{ fontSize: '2rem' }} onClick={() => setIsExpanded(!isExpanded)} />
				<Typography className='card-title' variant='h6' sx={{ fontWeight: 900 }}>{title}</Typography>
				{title && handleRunClick ?
					<>
						{_loading ?
							<CircularProgress />
							:
							<CustomBtn1 className='p-2 rounded-full' onClick={handleRunClick}>
								<img src={ImgPlay} alt='play icon' />
							</CustomBtn1>
						}
						<IconButton onClick={handleEditClick}>
							<img src={ImgTrippleDot} width={24} height={24} alt='three dots' />
						</IconButton>
					</>
					:
					''
				}
			</div>
			<Collapse in={isExpanded}>
				<Divider sx={{ margin: '1rem 0' }} />
				{children}
			</Collapse>
		</CardBlockComponent>
	)
};
CardBlock.defaultProps = {
	title: '',
	expanded: false,
	children: '',
	handleEditClick: () => { }
}

export default CardBlock;