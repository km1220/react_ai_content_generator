import _ from 'lodash';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@store';
import { startLoading, endLoading } from '@store/reducers/setting';

import { _ai_generate } from '@services/ai';
import { createNewPost } from '@services/wp';
import { _copy2Clipboard } from '@utils';

import {
	Box, Paper, Grid, Button, IconButton, Typography, Divider, Tooltip, CircularProgress,
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { DoneOutlineOutlined, ContentCopyOutlined, HearingDisabledOutlined } from '@mui/icons-material'

import { toast } from 'react-toastify';
import CustomBtn1 from '@components/CustomBtn1'

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
		margin: '1rem 3rem',

		[theme.breakpoints.down('md')]: {
			margin: '0.5rem 1rem',
		},
	}
}))


const FinalPreviewPage = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {
		_setting: { loading: _loading },
		user_inputs: _user_inputs,
		keywords: { selected: _selected_keywords },
		titles: { selected: _selected_title },
		outlines: { selected: _selected_outline },
		article_intros: { selected: _selected_article_intro },
		article_bodies: { selected: _selected_article_bodies },
		article_conclusions: { selected: _selected_article_conclusion },
	} = useAppSelector((state) => state);

	useEffect(() => {
		if (!_selected_keywords.length) {
			toast.error('❗ Keywords are not selected yet.');
			navigate('/step1');
			return;
		}
		if (!_selected_title) {
			toast.error('❗ Title is not selected yet.');
			navigate('/step2');
			return;
		}
		if (!_selected_outline || !_selected_outline.length) {
			toast.error('❗ Outline is not selected yet.');
			navigate('/step3');
			return;
		}
		if (!_selected_article_intro) {
			toast.error('❗ Introduction paragraph is not selected yet.');
			navigate('/step4');
			return;
		}
		if (!_selected_article_bodies || !_selected_article_bodies.length) {
			toast.error('❗ Body Content is not selected yet.');
			navigate('/step5');
			return;
		}
		if (!_selected_article_conclusion) {
			toast.error('❗ Conclusion paragraph is not selected yet.');
			navigate('/step6');
			return;
		}
	}, [])

	const generateBlogText = () => {
		let resultText = `${_selected_title}\n\n\n1. Introduction\n\n${_selected_article_intro}\n\n\n`;
		_selected_outline.map((each_outline, iOutline) => {
			resultText += `${iOutline + 2}. ${each_outline}\n\n${_selected_article_bodies[iOutline]}\n\n\n`;
		});
		resultText += `${_selected_outline.length + 2}. Conclusion\n\n${_selected_article_conclusion}`;
		return resultText;
	}
	const onCopy = () => _copy2Clipboard(generateBlogText());

	// const generateBlogHtml = () => {
	// 	let resultText = `<!-- wp:paragraph -->`;
	// 	// resultText += `<h1 contenteditable="true" class="wp-block wp-block-post-title block-editor-block-list__block editor-post-title editor-post-title__input rich-text" aria-label="Add title" role="textbox" aria-multiline="true" style="white-space: pre-wrap; min-width: 1px;">
	// 	// 	${_selected_title}
	// 	// </h1>`;
	// 	resultText += `<h2 role="document" aria-multiline="true" aria-label="Block: Heading" tabindex="0" class="block-editor-rich-text__editable block-editor-block-list__block wp-block wp-block-heading rich-text" data-type="core/heading" data-title="Heading" contenteditable="true" style="white-space: pre-wrap; min-width: 1px;" data-lt-tmp-id="lt-776697" spellcheck="false" data-gramm="false">
	// 		${`1. Introduction`}
	// 	</h2>`;
	// 	resultText += `<p role="document" aria-multiline="true" aria-label="Paragraph block" tabindex="0" class="block-editor-rich-text__editable block-editor-block-list__block wp-block wp-block-paragraph rich-text" data-type="core/paragraph" data-title="Paragraph" data-empty="false" contenteditable="true" style="white-space: pre-wrap; min-width: 1px;">
	// 		${_selected_article_intro}
	// 	</p>`;

	// 	_selected_outline.map((each_outline, iOutline) => {
	// 		resultText += `<h2 role="document" aria-multiline="true" aria-label="Block: Heading" tabindex="0" class="block-editor-rich-text__editable block-editor-block-list__block wp-block wp-block-heading rich-text" data-type="core/heading" data-title="Heading" contenteditable="true" style="white-space: pre-wrap; min-width: 1px;" data-lt-tmp-id="lt-776697" spellcheck="false" data-gramm="false">
	// 			${iOutline + 2}. ${each_outline}
	// 		</h2>`;
	// 		resultText += `<p role="document" aria-multiline="true" aria-label="Paragraph block" tabindex="0" class="block-editor-rich-text__editable block-editor-block-list__block wp-block wp-block-paragraph rich-text" data-type="core/paragraph" data-title="Paragraph" data-empty="false" contenteditable="true" style="white-space: pre-wrap; min-width: 1px;">
	// 			${_selected_article_bodies[iOutline]}
	// 		</p>`
	// 	});

	// 	resultText += `<h2 role="document" aria-multiline="true" aria-label="Block: Heading" tabindex="0" class="block-editor-rich-text__editable block-editor-block-list__block wp-block wp-block-heading rich-text" data-type="core/heading" data-title="Heading" contenteditable="true" style="white-space: pre-wrap; min-width: 1px;" data-lt-tmp-id="lt-776697" spellcheck="false" data-gramm="false">
	// 		${_selected_outline.length + 2}. Conclusion
	// 	</h2>`
	// 	resultText += `<p role="document" aria-multiline="true" aria-label="Paragraph block" tabindex="0" class="block-editor-rich-text__editable block-editor-block-list__block wp-block wp-block-paragraph rich-text" data-type="core/paragraph" data-title="Paragraph" data-empty="false" contenteditable="true" style="white-space: pre-wrap; min-width: 1px;">
	// 		${_selected_article_conclusion}
	// 	</p>`;
	// 	resultText += `<!-- /wp:paragraph -->`;
	// 	return resultText;
	// }
	const generateBlogHtml = () => {
		let resultText = `<!-- wp:paragraph -->`;
		resultText += `<h4>1. Introduction</h4>\n\n${_selected_article_intro}\n\n\n`;
		_selected_outline.map((each_outline, iOutline) => {
			resultText += `<h4>${iOutline + 2}. ${each_outline}</h4>\n\n${_selected_article_bodies[iOutline]}\n\n\n`;
		});
		resultText += `<h4>${_selected_outline.length + 2}. Conclusion</h4>\n\n${_selected_article_conclusion}`;
		resultText += `<!-- /wp:paragraph -->`;
		return resultText;
	}
	const handleDone = () => {
		dispatch(startLoading());
		// Call this function to create a new post
		createNewPost({
			title: _selected_title,
			content: generateBlogHtml(),
			status: 'publish'
		})
			.then((response) => {
				console.log(response.data);
				toast.success('👍 Successfully created !');
				dispatch(endLoading());
			})
			.catch((error) => {
				console.error(error);
				toast.error(error);
				dispatch(endLoading());
			});
	}

	return (
		<>
			<PageBody>
				<Paper className='gap-4 header'>
					<div className='flex gap-4'>
						<Box className='flex flex-col mr-auto'>
							<Typography variant='h4'>Final : Preivew <u>Result Blog Post</u></Typography>
							<Typography variant='caption'><b>Description:</b> {_user_inputs.description}</Typography>
							<Typography variant='caption'><b>Keywords:</b> {_selected_keywords.join(', ')}</Typography>
						</Box>
						<Box className='flex items-center gap-4 shrink-0 header-action-container'>
							{_loading ?
								<CircularProgress />
								:
								<CustomBtn1 variant='contained'
									onClick={() => { handleDone() }}
								>
									<DoneOutlineOutlined className='mr-2' />
									<span>Done</span>
								</CustomBtn1>
							}
						</Box>
					</div>
				</Paper>
				<div className='content'>
					<Paper className='flex flex-col py-4 rounded-xl' elevation={8}>
						<div className='flex items-center px-4'>
							<Typography className='mx-auto my-4' variant='h5' align='center' fontWeight={800}>
								{_selected_title}
							</Typography>
							<Tooltip title="Copy to clipboard">
								<IconButton onClick={() => onCopy()}>
									<ContentCopyOutlined />
								</IconButton>
							</Tooltip>
						</div>
						<Divider className='mb-4 border-b-2' />
						<Grid container className='px-6 space-y-4'>
							<Grid item className='w-full'>
								<Typography variant='subtitle1'>
									1. Introduction
								</Typography>
								<Divider sx={{ width: '100%', borderColor: theme.palette.secondary.main }} />
								<Typography variant='body2'>
									{_selected_article_intro}
								</Typography>
							</Grid>
							{_selected_outline ?
								_selected_outline.map((each_outline, iOutline) =>
									<Grid item key={iOutline} className='w-full'>
										<Typography variant='subtitle1'>
											{iOutline + 2}. {each_outline}
										</Typography>
										<Typography variant='body2'>
											{_selected_article_bodies[iOutline]}
										</Typography>
									</Grid>
								)
								:
								''
							}
							<Grid item className='w-full'>
								<Typography variant='subtitle1'>
									{_selected_outline?.length + 2}. Conclusion
								</Typography>
								<Divider className='w-full' />
								<Typography variant='body2'>
									{_selected_article_conclusion}
								</Typography>
							</Grid>
						</Grid>
					</Paper>
				</div >
			</PageBody >
		</>
	)
}

export default FinalPreviewPage;