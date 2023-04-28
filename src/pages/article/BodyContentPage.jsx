import _ from 'lodash';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@store';
import { startLoading, endLoading } from '@store/reducers/setting';
import {
	insert2Total,
	// setTotal as setTotalBodies,
	setSelected as setSelectedBodies,
	reset as resetBodies
} from '@store/reducers/article_bodies';
import { reset as resetConclusions } from '@store/reducers/article_conclusions';

import { _ai_generate } from '@services/ai';
import { _copy2Clipboard } from '@utils';

import {
	Box, Paper, Grid, Button, IconButton, Typography, Divider, Tooltip, CircularProgress, LinearProgress,
} from '@mui/material'
import { styled, useTheme, alpha } from '@mui/material/styles'
import {
	ArrowForward, RefreshOutlined, StopCircleOutlined,
	DoneAllOutlined, DoneOutlined, DoneOutlineOutlined,
	ContentCopyOutlined
} from '@mui/icons-material'

import { toast } from 'react-toastify';
import CustomBtn1 from '@components/CustomBtn1'
import ImgPlay from '@assets/imgs/play.svg';


const MAX_AI_GEN_NUM = 3;


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
		padding: '2rem 4rem',
		gap: '6rem',
		[theme.breakpoints.down('md')]: {
			padding: '0.5rem 1.5rem',
		},
	},
}));

const BodyContentPage = () => {
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
		article_bodies: _article_bodies,
	} = useAppSelector((state) => state);

	const [FR, setFR] = useState(0);
	const _forceRerender = () => setFR(FR + 1);

	const _flagRunning = useRef(false);
	const [currentHeading, setCurrentHeading] = useState('');
	const progressStepSize = 100 / (MAX_AI_GEN_NUM * _selected_outline?.length);
	const [progress, setProgress] = useState(0);
	// console.log('progressStepSize', progressStepSize, _selected_outline?.length)

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
	}, []);
	useEffect(() => _flagRunning.current = _loading, [_loading])


	const _genAISubSection = (subheading) => _ai_generate('custom-messages', {
		messages: [
			{
				role: "system",
				content: "You are a content generator for a website blogs.\nYou respond as an expert, but in a casual way."
			},
			{
				role: "user",
				content: `{Category(Content): [Subcategory(Blog Content Paragraph for a subheading)]<Attributes(Length: "around 6000 letters", Background: "buprenorphine prescribers", Keywords: "buprenorphine, buprenorphine for opioid use, buprenorphine practitioner locator, Dispensers of buprenorphine must, patterns of buprenorphine waivered, prescribed buprenorphine, treatment with buprenorphine, access to buprenorphine providers, buprenorphine pipeline graphic, Buprenorphine Practitioner, buprenorphine providers, buprenorphine waiver program, distribution of buprenorphine, nearest buprenorphine provider, office-based buprenorphine services, patients with buprenorphine, prevalence of buprenorphine, individual patient, Mental Health Services Administration, health, Mental Health Services, U.S. Department of Health & Human Services, prescriber, Buprenorphine prescribers, buprenorphine-waivered prescribers, High-volume prescribers, opioid use disorder, opioid use disorder treatment, Opioid use disorder prescriptions, substance use disorder treatment, opioid addiction, addiction specialists, addiction, addiction psychiatry, American Board of Addiction Medicine, certification in addiction medicine, primary care physicians, rural counties, access, medications, effective medication treatment, medication treatment availability, Substance Abuse, nurse practitioners, individuals with opioid use, medications for opioid use, barriers to treatment, medication-assisted treatment, opioid dependence, treatment of opioid use, buprenorphine treatment, treatment services, OUD treatment, treatment for opioid use, treatment program, treatment providers, qualified providers, medical provider, Primary care providers, buprenorphine waivers", Constraints: "Only output the Content Paragraph for below subheading without other contents.", Output: "Informative, Description")}>}\n{Title: "Buprenorphine Practitioner Locator: Find Your Nearest Provider"}\n{Outline: "Understanding Buprenorphine and its Use for Opioid Addiction Treatment\nAccess to Buprenorphine Providers and the Buprenorphine Waiver Program\nDistribution and Patterns of Buprenorphine Prescribers\nBuprenorphine Practitioner Locator: Finding Your Nearest Provider\nOffice-Based Buprenorphine Services and Treatment Options\nBarriers to Treatment and Improving Access to Buprenorphine Providers"}`
			},
			{
				role: "system",
				content: `Buprenorphine is a medication used in the treatment of opioid addiction.\nIt is prescribed as part of medication-assisted treatment (MAT) along with counseling and behavioral therapies.\nBuprenorphine works by reducing withdrawal symptoms and cravings associated with opioid dependence, making it easier for individuals to focus on their recovery.\nThe Substance Abuse and Mental Health Services Administration (SAMHSA), part of the U.S.\nDepartment of Health & Human Services, oversees the use of buprenorphine in the treatment of opioid addiction.\nBuprenorphine can be prescribed by qualified medical providers, including primary care physicians, nurse practitioners, and addiction specialists who have completed certification in addiction medicine through the American Board of Addiction Medicine.\nHowever, access to buprenorphine providers can be limited, particularly in rural counties where there may be fewer healthcare options.\nIncreasing access to effective medication treatment for opioid use disorder (OUD) is critical to addressing the current opioid epidemic.`
			},
			{
				role: "user",
				content: `{Category(Content): [Subcategory(Blog Content Paragraph for a subheading)]<Attributes(Length: "around 6000 letters", Background: “${_user_input.description}”, Keywords: “${_selected_keyword.join('”, “')}”, Constraints: "Only output the Content Paragraph without other contents. like Introduction, Conclusion", Output: "Informative, Description")}>}\n{Title: “${_selected_title}”}\n{Outline: “${_selected_outline}\n{Subheading: ${subheading}}`
			},
		],
	});
	const _genAIArticleBody = async () => {
		if (!_user_input.description || !_selected_keyword.length || !_selected_title || !_selected_outline.length || !_selected_article_intro) return;

		_flagRunning.current = true;
		dispatch(startLoading());

		const NUM_SUB_HEADINGS = _selected_outline.length;

		async function processSubHeadings() {
			for (let n = 0; n < MAX_AI_GEN_NUM; n++) {
				for (let i = 0; i < NUM_SUB_HEADINGS; i++) {
					if (!_flagRunning.current) { // break loop when user click "stop" button
						dispatch(endLoading());
						return;
					}
					const each_heading = _selected_outline[i];
					setCurrentHeading(each_heading);
					try {
						let api_response;
						do {
							api_response = await _genAISubSection(each_heading);
							console.log(api_response, '=========================----------------------')
						} while (!api_response);
						dispatch(insert2Total({ iPos: n, iSub: i, data: api_response }));
						toast.success(`Round ${n + 1} ===>  ${i + 1}: ${each_heading}`);
						setProgress(progressStepSize * (n * NUM_SUB_HEADINGS + i));
					}
					catch (err) {
						toast.error(`Round ${n + 1} ===>  ${i + 1}: ${each_heading}`);
						console.log(err, 'error --------------------')
					}
				}
			}
		}
		await processSubHeadings();

		dispatch(endLoading());
		_flagRunning.current = false;
	}
	const handleReset = () => {
		dispatch(endLoading());
		_flagRunning.current = false;
		dispatch(resetBodies());
		dispatch(resetConclusions());
	}
	const handleStopGenerating = () => {
		_flagRunning.current = false;
		_forceRerender();
	}


	// generate text to copy clipboard
	const genArr2ArticleText = (articleArr) =>
		articleArr.map((e_subsection, iSub) =>
			`${`💬 ${_selected_outline[iSub]}`}\n${e_subsection}`
		).join('\n\n');

	const genArr2Component = (articleArr) => {
		const outline = articleArr.map((e_subsection, iSub) => (
			<div key={iSub} className='relative my-6'>
				<Typography className='mb-1' variant='subtitle1'>
					{`💬 ${_selected_outline[iSub]}`}
				</Typography>
				<Typography variant='body2'>{e_subsection}</Typography>
				<IconButton className='absolute top-0 right-0' onClick={() => onCopySubSection(e_subsection, iSub)}>
					<ContentCopyOutlined fontSize='small' />
				</IconButton>
				<Divider />
			</div>
		));
		return outline;
	}
	// click event handler
	const onSelectBody = (body) => dispatch(setSelectedBodies(body));
	const onCopyArticle = (arr_article_body) => _copy2Clipboard(genArr2ArticleText(arr_article_body));
	const onCopySubSection = (e_subsection, iSub) => _copy2Clipboard(`💬 ${_selected_outline[iSub]}\n${e_subsection}`)

	return (
		<>
			<PageBody>
				<Paper className='gap-4 header'>
					<div className='flex gap-4'>
						<Box className='flex flex-col'>
							<Typography variant='h4'>5. Choose a <u>Body Content</u></Typography>
							<Typography variant='body1'>Press <b>{`<Generate>`}</b> button. And then press your desired <u>body content</u> in left panel.</Typography>
							<Typography variant='caption'><b>Description:</b> {_user_input.description}</Typography>
							<Typography variant='caption'><b>Keywords:</b> {_selected_keyword.join(', ')}</Typography>
						</Box>
						<div className='grow' />
						<Box className='flex items-center gap-4 header-action-container'>
							{_loading ?
								// <div className='flex items-center shrink-0'>
								// 	<Typography variant="body2">{currentHeading}</Typography>
								<CircularProgress />
								// </div>
								:
								<CustomBtn1 variant='contained'
									disabled={_article_bodies.total.length ? true : false}
									onClick={_genAIArticleBody}
								>
									<span>Generate Bodies</span>
									<img className='ml-2' src={ImgPlay} alt='play icon' />
								</CustomBtn1>
							}
							{_loading ?
								<CustomBtn1 variant='outlined'
									disabled={!_flagRunning.current}
									onClick={handleStopGenerating}
								>
									<StopCircleOutlined className='mr-2' />
									<span>Stop</span>
								</CustomBtn1>
								:
								<CustomBtn1 variant='outlined'
									disabled={!_loading && !_article_bodies.total.length}
									onClick={handleReset}
								>
									<RefreshOutlined className='mr-2' />
									<span>Reset</span>
								</CustomBtn1>
							}

							<CustomBtn1 variant='contained'
								disabled={!_article_bodies.selected}
								onClick={() => navigate('/step6')}
							>
								<span>Next (Conclusion)</span>
								<ArrowForward className='ml-2' />
							</CustomBtn1>
						</Box>
					</div>
					{_loading && progress !== 0 ?
						<LinearProgress variant='buffer' color='success'
							value={progress} valueBuffer={progress + progressStepSize}
							sx={{ height: '1rem', border: '1px solid' }} />
						:
						''
					}
					{_loading ?
						<Typography variant="body2" textAlign='center'>{currentHeading}</Typography>
						:
						''
					}
				</Paper>
				<div className='content'>
					{_article_bodies.total.length ?
						_article_bodies.total.map((each_article_body, i) => {
							const isSelected = _.isEqual(_article_bodies.selected, each_article_body) ? true : false;
							let selectedPaperSX = {};
							let selectedTypoSX = { whiteSpace: 'pre-wrap' };
							if (isSelected) {
								selectedPaperSX = { bgcolor: alpha(theme.palette.secondary.light, 0.2) }
								selectedTypoSX = { color: 'secondary.dark', whiteSpace: 'pre-wrap' }
							}
							return (
								<Paper key={i} className='relative px-8 py-4' elevation={8}
									sx={selectedPaperSX}
								>
									<Typography variant='h6' sx={selectedTypoSX}>
										<b>Body Content {i + 1} :</b>
										<br />
										{genArr2Component(each_article_body)}
									</Typography>
									<div className='absolute flex justify-end top-2 right-2'>
										{isSelected ?
											<Tooltip title="SELECTED">
												<IconButton sx={{
													background: alpha(theme.palette.background.paper, 0.5),
													color: theme.palette.secondary.dark,
													border: `2px solid ${theme.palette.secondary.dark}`,
													borderRadius: 2,
												}}>
													<DoneAllOutlined fontSize='large' />
												</IconButton>
											</Tooltip>
											:
											<Tooltip title="Select this body content">
												<IconButton onClick={() => onSelectBody(each_article_body)} sx={{ background: alpha(theme.palette.background.paper, 0.5) }}>
													<DoneOutlined fontSize='large' />
												</IconButton>
											</Tooltip>
										}
										<Tooltip title="Copy to clipboard">
											<IconButton onClick={() => onCopyArticle(each_article_body)}>
												<ContentCopyOutlined fontSize='large' />
											</IconButton>
										</Tooltip>
									</div>
								</Paper>
							)
						})
						:
						<Typography variant='h5' color='text.disabled' align='center'>Generated Bodies</Typography>
					}
				</div>
			</PageBody >
		</>
	)
}

export default BodyContentPage;