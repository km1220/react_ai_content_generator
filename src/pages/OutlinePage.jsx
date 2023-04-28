import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@store';
import { startLoading, endLoading } from '@store/reducers/setting';
import {
	setTotal as setTotalOutlines,
	setSelected as setSelectedOutlines,
	reset as resetOutlines
} from '@store/reducers/outlines';
import { reset as resetIntros } from '@store/reducers/article_intros';
import { reset as resetBodies } from '@store/reducers/article_bodies';
import { reset as resetConclusions } from '@store/reducers/article_conclusions';

import { _ai_generate } from '@services/ai';
import { _copy2Clipboard } from '@utils';

import {
	Box, Paper, Grid, Button, IconButton, Typography, Divider, Tooltip, CircularProgress,
} from '@mui/material'
import { styled, useTheme, alpha } from '@mui/material/styles'
import { ArrowForward, RefreshOutlined, DoneAllOutlined, DoneOutlined, DoneOutlineOutlined, ContentCopyOutlined } from '@mui/icons-material'

import { toast } from 'react-toastify';
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
		display: 'flex', flexGrow: 1,
		justifyContent: 'center', alignItems: 'center',

		'& > .left-panel': {
			display: 'flex', flexDirection: 'column', flexGrow: 1,
			minHeight: '100%',
			borderRight: `2px solid ${theme.palette.divider}`,
			borderBottom: 0,
			padding: '2rem 1rem',
			gap: '1rem',
			[theme.breakpoints.down('md')]: {
				minHeight: 'auto',
				borderRight: 0,
				borderBottom: `2px solid ${theme.palette.divider}`,
			},
		},
		'& > .right-panel': {
			display: 'flex', flexDirection: 'column', flexGrow: 1,
			padding: '2rem 1rem',
			minHeight: '100%',
			justifyContent: 'start',
		}
	}
}))


const OutlinePage = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {
		_setting: { loading: _loading },
		user_inputs: _user_inputs,
		keywords: { selected: _selected_keywords },
		titles: { selected: _selected_title },
		outlines: _outlines,
	} = useAppSelector((state) => state);

	useEffect(() => {
		if (!_selected_keywords.length) {
			handleReset();
			toast.error('❗ Keywords are not selected yet.');
			navigate('/step1');
			return;
		}
		if (!_selected_title) {
			handleReset();
			toast.error('❗ Title is not selected yet.');
			navigate('/step2');
			return;
		}
	}, [])


	const _generateAIOutline = async () => {
		if (!_user_inputs.description || !_selected_keywords.length || !_selected_title) return;

		dispatch(startLoading());
		const resultTextOutlines = await _ai_generate('custom-messages', {
			messages: [
				{
					role: "system",
					content: "You are a content generator for website blogs."
				},
				{
					role: "user",
					content: `{Category(Content): [Subcategory(Blog Outline Headings)]<Attributes(Length: "5-7 subheadings", Background: "buprenorphine prescribers", Keywords: "buprenorphine, buprenorphine for opioid use, buprenorphine practitioner locator, Dispensers of buprenorphine must, patterns of buprenorphine waivered, prescribed buprenorphine, treatment with buprenorphine, access to buprenorphine providers, buprenorphine pipeline graphic, Buprenorphine Practitioner, buprenorphine providers, buprenorphine waiver program, distribution of buprenorphine, nearest buprenorphine provider, office-based buprenorphine services, patients with buprenorphine, prevalence of buprenorphine, individual patient, Mental Health Services Administration, health, Mental Health Services, U.S. Department of Health & Human Services, prescriber, Buprenorphine prescribers, buprenorphine-waivered prescribers, High-volume prescribers, opioid use disorder, opioid use disorder treatment, Opioid use disorder prescriptions, substance use disorder treatment, opioid addiction, addiction specialists, addiction, addiction psychiatry, American Board of Addiction Medicine, certification in addiction medicine, primary care physicians, rural counties, access, medications, effective medication treatment, medication treatment availability, Substance Abuse, nurse practitioners, individuals with opioid use, medications for opioid use, barriers to treatment, medication-assisted treatment, opioid dependence, treatment of opioid use, buprenorphine treatment, treatment services, OUD treatment, treatment for opioid use, treatment program, treatment providers, qualified providers, medical provider, Primary care providers, buprenorphine waivers", Constraints: "Only output the headings without subheadings. Separate each outline headings with numbering and line breaks.", Output: "Informative, Brief")}>}\n{Title: "Buprenorphine Practitioner Locator: Find Your Nearest Provider"}`
				},
				{
					role: "system",
					content: `1. Understanding Buprenorphine and its Use for Opioid Addiction Treatment\n2. Access to Buprenorphine Providers and the Buprenorphine Waiver Program\n3. Distribution and Patterns of Buprenorphine Prescribers\n4. Buprenorphine Practitioner Locator: Finding Your Nearest Provider\n5. Office-Based Buprenorphine Services and Treatment Options\n6. Barriers to Treatment and Improving Access to Buprenorphine Providers`
				},
				{
					role: "user",
					content: `{Category(Content): [Subcategory(Blog Outline Headings)]<Attributes(Length: "5-7 subheadings", Background: “${_user_inputs.description}”, Keywords: “${_selected_keywords.join('”, “')}”, Constraints: "Only output the headings without subheadings. Separate each outline headings with numbering and line breaks.", Output: "Informative, Brief")}>}\n{Title: “${_selected_title}”}`
				},
			],
			n: 3
		});

		if (resultTextOutlines) {
			// remove line breaks, numberings, and useless spaces
			const sanitizedOutlines = resultTextOutlines.map(each => {
				const splitedOutline = each.split(/\n\d+\. /g).filter(Boolean);
				const numberingRemovedOutline = splitedOutline.map(line => line.replace(/^\d+\.\s+/, '').trim());
				console.log(splitedOutline, 'numberingRemovedOutline', numberingRemovedOutline)
				return numberingRemovedOutline;
			});
			// remote "Introduction" and "Conclusion" outline heading in the result array
			let arrOutlines = sanitizedOutlines.map(each => {
				if (each[0].toLowerCase().includes('introduction'))
					each.shift();
				if (each[each.length - 1].toLowerCase().includes('conclusion'))
					each.pop();
				console.log(each, 'eachOutline')
				return each;
			});

			console.log(arrOutlines, 'arrOutlines')
			dispatch(setTotalOutlines(arrOutlines));
		}
		dispatch(endLoading());
	}
	const handleReset = () => {
		dispatch(endLoading());
		dispatch(resetOutlines());
		dispatch(resetIntros());
		dispatch(resetBodies());
		dispatch(resetConclusions());
	}

	const genArr2Text = (arr_outline) => {
		let outline = '1. Introduction\n';
		outline += arr_outline.map((e_title, iTitle) => `${iTitle + 2}. ${e_title}`).join('\n');
		outline += `\n${arr_outline.length + 2}. Conclusion`;
		return outline;
	}
	const onSelectOutline = (outline) => dispatch(setSelectedOutlines(outline));
	const onCopyOutline = (text) => _copy2Clipboard(text);

	return (
		<>
			<PageBody>
				<Paper className='gap-4 header'>
					<div className='flex gap-4'>
						<Box className='flex flex-col mr-auto'>
							<Typography variant='h4'>3. Choose an <u>Outline</u></Typography>
							<Typography variant='body1'>Press <b>{`<Generate>`}</b> button. And then press your desired <u>outline</u> in left panel.</Typography>
							<Typography variant='caption'><b>Description:</b> {_user_inputs.description}</Typography>
							<Typography variant='caption'><b>Keywords:</b> {_selected_keywords.join(', ')}</Typography>
						</Box>
						<Box className='flex items-center gap-4 shrink-0 header-action-container'>
							{_loading ?
								<CircularProgress />
								:
								<CustomBtn1 variant='contained'
									disabled={_outlines.total.length ? true : false}
									onClick={_generateAIOutline}
								>
									<span>Generate Outlines</span>
									<img className='ml-2' src={ImgPlay} alt='play icon' />
								</CustomBtn1>
							}
							<CustomBtn1 variant='outlined'
								disabled={!_loading && !_outlines.total.length}
								onClick={handleReset}
							>
								<RefreshOutlined className='mr-2' />
								<span>Reset</span>
							</CustomBtn1>
							<CustomBtn1 variant='contained'
								disabled={!_outlines.selected}
								onClick={() => navigate('/step4')}
							>
								<span>Next (Intro)</span>
								<ArrowForward className='ml-2' />
							</CustomBtn1>
						</Box>
					</div>
				</Paper>
				<Grid container className='content'>
					<Grid item className='left-panel' sm={12} md={6}>
						{_outlines.total.length ?
							_outlines.total.map((each_outline, iOutline) => {
								const isSelected = _.isEqual(_outlines.selected, each_outline);
								const text = genArr2Text(each_outline);
								return (
									<Paper key={iOutline} className='relative px-8 py-4' elevation={4}>
										<Typography variant='h6' sx={{ whiteSpace: 'pre-wrap' }}>
											<b>Outline {iOutline + 1} :</b>
											<br />
											{text}
										</Typography>
										<div className='absolute flex justify-end bottom-2 right-2'>
											{isSelected ?
												<Tooltip title="SELECTED">
													<IconButton sx={{
														background: alpha(theme.palette.background.paper, 0.5),
														color: theme.palette.secondary.dark,
														border: `2px solid ${theme.palette.secondary.dark}`,
														borderRadius: 2,
													}}>
														<DoneAllOutlined fontSize='small' />
													</IconButton>
												</Tooltip>
												:
												<Tooltip title="Select this outline">
													<IconButton onClick={() => onSelectOutline(each_outline)} sx={{ background: alpha(theme.palette.background.paper, 0.5) }}>
														<DoneOutlined fontSize='small' />
													</IconButton>
												</Tooltip>
											}
											<Tooltip title="Copy to clipboard">
												<IconButton onClick={() => onCopyOutline(text)}>
													<ContentCopyOutlined fontSize='small' />
												</IconButton>
											</Tooltip>
										</div>
									</Paper>
								)
							})
							:
							<Typography variant='h5' color='text.disabled' align='center'>Generated Outlines</Typography>
						}
					</Grid>
					<Grid item className='right-panel' sm={12} md={6}>
						{_outlines.selected ?
							<Paper className='p-4' elevation={4} sx={{ bgcolor: alpha(theme.palette.secondary.light, 0.2) }}>
								<Typography variant='h6' sx={{ color: 'secondary.dark', whiteSpace: 'pre-wrap' }}>
									<b>Selected Outline :</b>
									<br />
									{genArr2Text(_outlines.selected)}
								</Typography>
							</Paper>
							:
							<Typography variant='h5' color='text.disabled' align='center'>Selected Outline</Typography>
						}
					</Grid>
				</Grid>
			</PageBody >
		</>
	)
}

export default OutlinePage;