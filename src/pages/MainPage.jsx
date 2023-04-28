import _, { each } from 'lodash';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store';
import { startLoading, endLoading } from '@store/reducers/setting';
import { setDescription, reset as resetUserInputs } from '../store/reducers/user_inputs';
import {
	setFraseCluster,
	setTotal as setTotalKeywords,
	setSelected as setSelectedKeywords,
	reset as resetKeywords
} from '../store/reducers/keywords';
import { reset as resetTitles } from '../store/reducers/titles';
import { reset as resetOutlines } from '../store/reducers/outlines';
import { reset as resetArticleIntros } from '../store/reducers/article_intros';

import { _frase_cluster } from '../services/ai';

import {
	Box, Paper, Button, IconButton, Typography, Divider,
	TextField, OutlinedInput, Select, MenuItem, Chip, CircularProgress
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { ArrowForward, RefreshOutlined } from '@mui/icons-material'

import CustomBtn1 from '@components/CustomBtn1'
import ImgPlay from '@assets/imgs/play.svg';

const PageBody = styled(Box)(({ theme }) => ({
	display: 'flex', flexDirection: 'column', flexGrow: 1,

	'& > .header': {
		display: 'flex', flexDirection: 'column',
		borderBottom: `1px solid ${theme.palette.divider}`,
		// background: theme.palette.background.paper,
		padding: "1rem 3.5rem",
		[theme.breakpoints.down('md')]: {
			gap: 4,
			flexDirection: 'column',
			padding: "0.5rem 1.5rem",
		},
		'& .header-action-container': {
			justifyContent: 'center', alignItems: 'center',
			[theme.breakpoints.down('md')]: {
				flexDirection: 'column',
			}
		},
	},
	'& > .content': {
		display: 'flex', flexDirection: 'column', flexGrow: 1,
		justifyContent: 'center', alignItems: 'center',
		'& .keyword-selector': {
			minWidth: '15rem',
		}
	}
}))


const MainPage = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {
		_setting: { loading: _loading },
		user_inputs: _user_inputs,
		keywords: _keywords,
	} = useAppSelector((state) => state);



	const onKeywordsChange = (event) => {
		const newKeywordValue = event.target.value;
		const newKeywordList = typeof newKeywordValue === 'string' ? newKeywordValue.split(',') : newKeywordValue;
		dispatch(setSelectedKeywords(newKeywordList));
	};
	const onKeywordClick = (target_keyword, index) => {
		let isExist = false;
		// remove the target keyword if it's existing
		const remainKeyword = _keywords.selected.filter(each => {
			if (each === target_keyword) {
				isExist = true;
				return false;
			}
			return true;
		});
		console.log(target_keyword, isExist, remainKeyword);
		if (isExist)
			dispatch(setSelectedKeywords(remainKeyword));
		else
			dispatch(setSelectedKeywords([..._keywords.selected, target_keyword]));
	};
	const onKeywordDelete = (target_keyword) => {
		const remainKeyword = _keywords.selected.filter(each => each !== target_keyword);
		dispatch(setSelectedKeywords(remainKeyword));
	};
	const renderSelectedKeywordChips = (selected) => (
		<Box className='flex flex-wrap justify-center gap-2' style={{ maxWidth: '60vw' }}>
			{selected.map((each_keyword) => (
				<Chip key={each_keyword} label={each_keyword} style={{ textTransform: 'capitalize' }}
					onMouseDown={(event) => { event.stopPropagation(); }}
					onDelete={() => onKeywordDelete(each_keyword)}
				/>
			))}
		</Box>
	)
	const getSelectedKeywordStyles = (target, selected) => {
		const isSelected = selected.indexOf(target) === -1 ? false : true;
		let resultStyles = { textTransform: 'capitalize', padding: '0.5rem 1rem' };
		if (isSelected)
			resultStyles = {
				...resultStyles,
				fontWeight: theme.typography.fontWeightBold,
				background: theme.palette.action.selected,
			}
		return resultStyles;
	};

	const handleReset = () => {
		dispatch(endLoading());
		dispatch(resetUserInputs());
		dispatch(resetKeywords());
		dispatch(resetTitles());
		dispatch(resetOutlines());
		dispatch(resetArticleIntros());
	}
	const handleGenerate = async () => {
		dispatch(startLoading());
		const data_cluster = await _frase_cluster(_user_inputs.description);
		console.log('data_cluster', data_cluster)
		if (data_cluster) {
			dispatch(setFraseCluster(data_cluster));
			let buffTotal = [];
			data_cluster.map(e => {
				buffTotal = buffTotal.concat(e.keywords);
			})
			dispatch(setTotalKeywords(_.values(buffTotal)));
		}
		dispatch(endLoading());
	}

	return (
		<>
			<PageBody className='space-y-8'>
				<Paper className='gap-4 header'>
					<div className='flex gap-4'>
						<Box className='flex flex-col mr-auto'>
							<Typography variant='h4'>1. Tell the AI what you want to write about</Typography>
							<Typography variant='body1'>Enter a topic that best describes the content you want to create.</Typography>
						</Box>
						<Box className='flex items-center gap-4 header-action-container'>
							<CustomBtn1 variant='outlined'
								disabled={!_loading && !_keywords.total.length}
								onClick={handleReset}
							>
								<RefreshOutlined className='mr-2' />
								<span>Reset</span>
							</CustomBtn1>
							<CustomBtn1 variant='contained'
								disabled={!_keywords.selected.length}
								onClick={() => navigate('/step2')}
							>
								<span>Next (Title)</span>
								<ArrowForward className='ml-2' />
							</CustomBtn1>
						</Box>
					</div>
				</Paper>
				<div className='flex space-x-4 form-control-input px-14'>
					<OutlinedInput className='grow' classes={{ input: 'px-4 py-2' }}
						value={_user_inputs.description} onChange={e => dispatch(setDescription(e.target.value))}
					/>
					{_loading ?
						<CircularProgress />
						:
						<CustomBtn1 className='px-4 py-2'
							disabled={_keywords.total.length ? true : false}
							onClick={handleGenerate}
						>
							<span>Generate Keywords</span>
							<img className='ml-2' src={ImgPlay} alt='play icon' />
						</CustomBtn1>
					}
				</div>

				<div className='content'>
					{_keywords.total.length ?
						<Paper className='flex flex-col items-center gap-2 px-4 pt-8 mx-12 mb-12' elevation={10}>
							<Typography variant='h6'>Please select the keywords you want to use. These will be affected to all the generated results.</Typography>
							<Select
								className='keyword-selector' classes={{ select: 'p-2' }}
								multiple value={_keywords.selected} onChange={onKeywordsChange}
								input={<OutlinedInput className="select-multiple-keyword" />}
								renderValue={renderSelectedKeywordChips}
							>
								{_keywords.total.map(each => (
									<MenuItem
										key={each} value={each}
										style={getSelectedKeywordStyles(each, _keywords.selected)}
									>
										{each}
									</MenuItem>
								))}
							</Select>
							<div className='flex flex-col gap-6 p-2 mb-4 md:px-12'>
								{_keywords.fraseCluster?.map((each_group, i_g) => (
									<div key={i_g}>
										<Typography className='mx-4 my-2 capitalize' variant='h5' color='primary'>{each_group.label}</Typography>
										<div className='flex flex-wrap gap-2'>
											{each_group.keywords.map((e, i) => (
												<Chip key={e} label={e} color='success'
													variant={_keywords.selected.indexOf(e) === -1 ? "outlined" : "contained"}
													style={{ textTransform: 'capitalize' }}
													onClick={() => onKeywordClick(e, i)}
												/>
											))}
										</div>
									</div>
								))}
							</div>
						</Paper>
						:
						_loading ?
							<Typography variant='h5'>Analyzing keywords.</Typography>
							:
							<Typography variant='h5'>Please enter your describes and click <b>{`<Generate Keywords>`}</b> button.</Typography>
					}
				</div>
			</PageBody >
		</>
	)
}

export default MainPage;