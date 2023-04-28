import _ from 'lodash';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@store';
import { startLoading, endLoading } from '@store/reducers/setting';
import {
	setTotal as setTotalConclusions,
	setSelected as setSelectedConclusions,
	reset as resetConclusions
} from '@store/reducers/article_conclusions';

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


const ConclusionPage = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {
		_setting: { loading: _loading },
		user_inputs: _user_input,
		keywords: { selected: _selected_keyword },
		titles: { selected: _selected_title },
		outlines: { selected: _selected_outline },
		article_intros: { selected: _selected_article_intro },
		article_bodies: { selected: _selected_article_bodie },
		article_conclusions: _article_conclusions,
	} = useAppSelector((state) => state);

	useEffect(() => {
		if (!_selected_keyword.length) {
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
		if (!_selected_outline || !_selected_outline.length) {
			handleReset();
			toast.error('❗ Outline is not selected yet.');
			navigate('/step3');
			return;
		}
		if (!_selected_article_intro) {
			handleReset();
			toast.error('❗ Introduction paragraph is not selected yet.');
			navigate('/step4');
			return;
		}
		if (!_selected_article_bodie || !_selected_article_bodie.length) {
			handleReset();
			toast.error('❗ Body Content is not selected yet.');
			navigate('/step5');
			return;
		}
	}, [])

	const _generateAIConclusion = async () => {
		if (!_user_input.description || !_selected_keyword.length || !_selected_title || !_selected_outline.length) return;

		dispatch(startLoading());
		const resultConclusion = await _ai_generate('custom-messages', {
			messages: [
				{
					role: "system",
					content: "You are a content generator for a website blogs.\nYou respond as an expert, but in a casual way."
				},
				{
					role: "user",
					content: `{Category(Content): [Subcategory(Blog Conclusion Paragraph)]<Attributes(Length: "around 6000 letters", Background: "buprenorphine prescribers", Keywords: "buprenorphine, buprenorphine for opioid use, buprenorphine practitioner locator, Dispensers of buprenorphine must, patterns of buprenorphine waivered, prescribed buprenorphine, treatment with buprenorphine, access to buprenorphine providers, buprenorphine pipeline graphic, Buprenorphine Practitioner, buprenorphine providers, buprenorphine waiver program, distribution of buprenorphine, nearest buprenorphine provider, office-based buprenorphine services, patients with buprenorphine, prevalence of buprenorphine, individual patient, Mental Health Services Administration, health, Mental Health Services, U.S. Department of Health & Human Services, prescriber, Buprenorphine prescribers, buprenorphine-waivered prescribers, High-volume prescribers, opioid use disorder, opioid use disorder treatment, Opioid use disorder prescriptions, substance use disorder treatment, opioid addiction, addiction specialists, addiction, addiction psychiatry, American Board of Addiction Medicine, certification in addiction medicine, primary care physicians, rural counties, access, medications, effective medication treatment, medication treatment availability, Substance Abuse, nurse practitioners, individuals with opioid use, medications for opioid use, barriers to treatment, medication-assisted treatment, opioid dependence, treatment of opioid use, buprenorphine treatment, treatment services, OUD treatment, treatment for opioid use, treatment program, treatment providers, qualified providers, medical provider, Primary care providers, buprenorphine waivers", Constraints: "Only output the Conclusion Paragraph without other contents.", Output: "Informative, Description")}>}\n{Title: "Buprenorphine Practitioner Locator: Find Your Nearest Provider"}\n{Outline: "Understanding Buprenorphine and its Use for Opioid Addiction Treatment\nAccess to Buprenorphine Providers and the Buprenorphine Waiver Program\nDistribution and Patterns of Buprenorphine Prescribers\nBuprenorphine Practitioner Locator: Finding Your Nearest Provider\nOffice-Based Buprenorphine Services and Treatment Options\nBarriers to Treatment and Improving Access to Buprenorphine Providers"}`
				},
				{
					role: "system",
					content: `Conclusion: Buprenorphine is an effective medication treatment for opioid addiction, but access to qualified providers can be a challenge.\nDispensers of buprenorphine must complete a waiver program, and high-volume prescribers are limited in their abilities.\nHowever, the prevalence of buprenorphine-waivered prescribers is growing, and the Substance Abuse and Mental Health Services Administration offers resources for finding individual patient treatment services.\nThis blog will explore the importance of buprenorphine treatment, the Buprenorphine Practitioner Locator, and barriers to accessing medication-assisted treatment for opioid dependence."}`
				},
				{
					role: "user",
					content: `{Category(Content): [Subcategory(Blog Conclusion Paragraph)]<Attributes(Length: "around 6000 letters", Background: “${_user_input.description}”, Keywords: “${_selected_keyword.join('”, “')}”, Constraints: "Only output the Conclusion Paragraph without other contents.", Output: "Informative, Description")}>}\n{Title: “${_selected_title}”}\n{Outline: “${_selected_outline}”}`
				},
			],
			n: 3
		});
		if (resultConclusion)
			dispatch(setTotalConclusions(resultConclusion));
		dispatch(endLoading());
	}
	const handleReset = () => {
		dispatch(endLoading());
		dispatch(resetConclusions());
	}

	const genSelectedOutlineText = () => {
		let outline = '1. Introduction\n';
		outline += _selected_outline.map((e_title, iTitle) => `${iTitle + 2}. ${e_title}`).join('\n');
		outline += `\n${_selected_outline.length + 2}. Conclusion`;
		return outline;
	}
	const onSelectConclusion = (conclusion) => dispatch(setSelectedConclusions(conclusion));
	const onCopyConclusion = (conclusion) => _copy2Clipboard(conclusion);

	return (
		<>
			<PageBody>
				<Paper className='gap-4 header'>
					<div className='flex gap-4'>
						<Box className='flex flex-col mr-auto'>
							<Typography variant='h4'>6. Choose a <u>Conclusion</u></Typography>
							<Typography variant='body1'>Press <b>{`<Generate>`}</b> button. And then press your desired <u>conclusion</u> in left panel.</Typography>
							<Typography variant='caption'><b>Description:</b> {_user_input.description}</Typography>
							<Typography variant='caption'><b>Keywords:</b> {_selected_keyword.join(', ')}</Typography>
						</Box>
						<Box className='flex items-center gap-4 shrink-0 header-action-container'>
							{_loading ?
								<CircularProgress />
								:
								<CustomBtn1 variant='contained'
									disabled={_article_conclusions.total.length ? true : false}
									onClick={_generateAIConclusion}
								>
									<span>Generate Conclusions</span>
									<img className='ml-2' src={ImgPlay} alt='play icon' />
								</CustomBtn1>
							}
							<CustomBtn1 variant='outlined'
								disabled={!_loading && !_article_conclusions.total.length}
								onClick={handleReset}
							>
								<RefreshOutlined className='mr-2' />
								<span>Reset</span>
							</CustomBtn1>
							<CustomBtn1 variant='contained'
								disabled={!_article_conclusions.selected}
								onClick={() => navigate('/final')}
							>
								<span>Preview</span>
								<ArrowForward className='ml-2' />
							</CustomBtn1>
						</Box>
					</div>
				</Paper>
				<Grid container className='content'>
					<Grid item className='left-panel' sm={12} md={6}>
						{_article_conclusions.total.length ?
							_article_conclusions.total.map((each_conclusion, i) => (
								<Paper key={i} className='relative px-8 py-4' elevation={4}>
									<Typography variant='h6' sx={{ whiteSpace: 'pre-wrap' }}>
										<b>Conclusion {i + 1} :</b>
										<br />
										{each_conclusion}
									</Typography>
									<div className='absolute flex justify-end bottom-2 right-2'>
										{_article_conclusions.selected === each_conclusion ?
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
											<Tooltip title="Select this conclusion">
												<IconButton onClick={() => onSelectConclusion(each_conclusion)} sx={{ background: alpha(theme.palette.background.paper, 0.5) }}>
													<DoneOutlined fontSize='small' />
												</IconButton>
											</Tooltip>
										}
										<Tooltip title="Copy to clipboard">
											<IconButton onClick={() => onCopyConclusion(each_conclusion)}>
												<ContentCopyOutlined fontSize='small' />
											</IconButton>
										</Tooltip>
									</div>
								</Paper>
							))
							:
							<Typography variant='h5' color='text.disabled' align='center'>Generated Conclusions</Typography>
						}
					</Grid>
					<Grid item className='right-panel' sm={12} md={6}>
						{_article_conclusions.selected ?
							<Paper className='p-4' elevation={4} sx={{ bgcolor: alpha(theme.palette.secondary.light, 0.2) }}>
								<Typography variant='h6' sx={{ color: 'secondary.dark', whiteSpace: 'pre-wrap' }}>
									<b>Selected Conclusion :</b>
									<br />
									{_article_conclusions.selected}
								</Typography>
							</Paper>
							:
							<Typography variant='h5' color='text.disabled' align='center'>Selected Conclusion</Typography>
						}
					</Grid>
				</Grid>
			</PageBody >
		</>
	)
}

export default ConclusionPage;