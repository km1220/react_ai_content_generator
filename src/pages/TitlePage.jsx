import _ from 'lodash';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@store';
import { startLoading, endLoading } from '@store/reducers/setting';
import {
	setTotal as setTotalTitles,
	setSelected as setSelectedTitles,
	reset as resetTitles
} from '@store/reducers/titles';
import { reset as resetOutlines } from '@store/reducers/outlines';
import { reset as resetIntros } from '@store/reducers/article_intros';
import { reset as resetBodies } from '@store/reducers/article_bodies';
import { reset as resetConclusions } from '@store/reducers/article_conclusions';

import { _ai_generate } from '@services/ai';
import { _copy2Clipboard } from '@utils';

import {
	Box, Paper, Grid, Button, IconButton, Typography, Divider, Tooltip, CircularProgress,
} from '@mui/material'
import { styled, useTheme, alpha } from '@mui/material/styles'
import {
	ArrowForward, RefreshOutlined,
	DoneAllOutlined, DoneOutlined, DoneOutlineOutlined,
	ContentCopyOutlined, AssignmentTurnedInOutlined
} from '@mui/icons-material'

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


const TitlePage = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {
		_setting: { loading: _loading },
		user_inputs: _user_inputs,
		keywords: { selected: _selected_keywords },
		titles: _titles,
	} = useAppSelector((state) => state);

	useEffect(() => {
		if (!_selected_keywords.length) {
			handleReset();
			toast.error('❗ Keywords are not selected yet.');
			navigate('/step1');
			return;
		}
		// if (_titles.total.length) return;
		// _generateAITitle();
	}, [])

	const _generateAITitle = async () => {
		if (!_user_inputs.description || !_selected_keywords.length) return;

		dispatch(startLoading());
		const prompt_text = `Write an article title for a web content about “${_user_inputs.description}”. The tone should be informative and brief. Use these keywords as references. “${_selected_keywords.join("', '")}”.`;
		// let resultTitle = await _ai_generate(prompt_text, { n: 10 });
		let resultTitles = await _ai_generate('custom-prompt', {
			messages: [
				{
					role: "system",
					content: "You are a content generator for website blogs."
				},
				{
					role: "user",
					content: `{Category(Content): [Subcategory(Title)]<Attributes(Length: "less than 50 characters", Background: "buprenorphine prescribers", Keywords: "buprenorphine, buprenorphine for opioid use, buprenorphine practitioner locator, Dispensers of buprenorphine must, patterns of buprenorphine waivered, prescribed buprenorphine, treatment with buprenorphine, access to buprenorphine providers, buprenorphine pipeline graphic, Buprenorphine Practitioner, buprenorphine providers, buprenorphine waiver program, distribution of buprenorphine, nearest buprenorphine provider, office-based buprenorphine services, patients with buprenorphine, prevalence of buprenorphine, individual patient, Mental Health Services Administration, health, Mental Health Services, U.S. Department of Health & Human Services, prescriber, Buprenorphine prescribers, buprenorphine-waivered prescribers, High-volume prescribers, opioid use disorder, opioid use disorder treatment, Opioid use disorder prescriptions, substance use disorder treatment, opioid addiction, addiction specialists, addiction, addiction psychiatry, American Board of Addiction Medicine, certification in addiction medicine, primary care physicians, rural counties, access, medications, effective medication treatment, medication treatment availability, Substance Abuse, nurse practitioners, individuals with opioid use, medications for opioid use, barriers to treatment, medication-assisted treatment, opioid dependence, treatment of opioid use, buprenorphine treatment, treatment services, OUD treatment, treatment for opioid use, treatment program, treatment providers, qualified providers, medical provider, Primary care providers, buprenorphine waivers", Constraints: "Only output the generated headline", Output: "Informative, attention-grabbing, brief")}>}`
				},
				{
					role: "system",
					content: "Buprenorphine Practitioner Locator: Find Your Nearest Provider"
				},
				{
					role: "user",
					content: `{Category(Content): [Subcategory(Title)]<Attributes(Length: "less than 50 characters", Background: “${_user_inputs.description}”, Keywords: “${_selected_keywords.join("', '")}”, Constraints: "Only output the generated headline", Output: "Informative, attention-grabbing, brief")}>}`
				}
			],
			n: 3
		});

		if (resultTitles) {
			// trim and delete quote letters from start and end of the result titles
			resultTitles = resultTitles.map(e => e.trim().replace(/^[ '"]|[ '"]$/g, ''));
			dispatch(setTotalTitles(resultTitles));
		}
		dispatch(endLoading());
	}
	const handleReset = () => {
		dispatch(endLoading());
		dispatch(resetTitles());
		dispatch(resetOutlines());
		dispatch(resetIntros());
		dispatch(resetBodies());
		dispatch(resetConclusions());
	}

	const onSelectTitle = (title) => dispatch(setSelectedTitles(title));
	const onCopyTitle = (title) => _copy2Clipboard(title);


	// _readClipboard().then(res => console.log('first', res))
	// setTimeout(async () => console.log(
	// 	await window.navigator.clipboard.readText()),
	// 	2000)
	// const _getClipboardText = async () => {
	// 	const text = await navigator.clipboard.readText();
	// 	return text;
	// }

	return (
		<>
			<PageBody>
				<Paper className='gap-4 header'>
					<div className='flex gap-4'>
						<Box className='flex flex-col mr-auto'>
							<Typography variant='h4'>2. Choose a <u>Title</u> for your article</Typography>
							<Typography variant='body1'>Press <b>{`<Generate>`}</b> button. And then press your desired <u>title</u> in left panel.</Typography>
							<Typography variant='caption'><b>Description:</b> {_user_inputs.description}</Typography>
							<Typography variant='caption'><b>Keywords:</b> {_selected_keywords.join(', ')}</Typography>
						</Box>
						<Box className='flex items-center gap-4 shrink-0 header-action-container'>
							{_loading ?
								<CircularProgress />
								:
								<CustomBtn1 variant='contained'
									disabled={_titles.total.length ? true : false}
									onClick={_generateAITitle}
								>
									<span>Generate Titles</span>
									<img className='ml-2' src={ImgPlay} alt='play icon' />
								</CustomBtn1>
							}
							<CustomBtn1 variant='outlined'
								disabled={!_loading && !_titles.total.length}
								onClick={handleReset}
							>
								<RefreshOutlined className='mr-2' />
								<span>Reset</span>
							</CustomBtn1>
							<CustomBtn1 variant='contained'
								disabled={!_titles.selected}
								onClick={() => navigate('/step3')}
							>
								<span>Next (Outline)</span>
								<ArrowForward className='ml-2' />
							</CustomBtn1>
						</Box>
					</div>
				</Paper>
				<Grid container className='content'>
					<Grid item className='left-panel' sm={12} md={6}>
						{_titles.total.length ?
							_titles.total.map((each_title, i) => (
								<Paper key={i} className='relative px-8 py-4' elevation={4}>
									<Typography variant='h6'>
										<b>Title {i + 1}:</b> {each_title}
									</Typography>
									<div className='absolute flex justify-end bottom-2 right-2'>
										{_titles.selected === each_title ?
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
											<Tooltip title="Select this title">
												<IconButton onClick={() => onSelectTitle(each_title)} sx={{ background: alpha(theme.palette.background.paper, 0.5) }}>
													<DoneOutlined fontSize='small' />
												</IconButton>
											</Tooltip>
										}
										<Tooltip title="Copy to clipboard">
											<IconButton onClick={() => onCopyTitle(each_title)}>
												<ContentCopyOutlined fontSize='small' />
											</IconButton>
										</Tooltip>
									</div>
								</Paper>
							))
							:
							<Typography variant='h5' color='text.disabled' align='center'>Generated Titles</Typography>
						}
					</Grid>
					<Grid item className='right-panel' sm={12} md={6}>
						{_titles.selected ?
							<Paper className='p-4' elevation={4} sx={{ bgcolor: alpha(theme.palette.secondary.light, 0.2) }}>
								<Typography variant='h6' color={'secondary.dark'}>
									<b>Selected Title:</b> {_titles.selected}
								</Typography>
							</Paper>
							:
							<Typography variant='h5' color='text.disabled' align='center'>Selected Title</Typography>
						}
					</Grid>
				</Grid>
			</PageBody >
		</>
	)
}

export default TitlePage;