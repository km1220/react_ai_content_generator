import { Link, useLocation } from 'react-router-dom';

import { Box, Divider, Tooltip } from '@mui/material';
import {
	TitleOutlined, FormatListNumberedOutlined, ArticleOutlined,
	Filter1Outlined, Filter2Outlined, Filter3Outlined,
	AssignmentTurnedInOutlined
} from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';

import ImgLogo from '@assets/imgs/logo.svg';
// import ImgBtn1 from '@assets/imgs/button1.svg';
// import ImgBtn2 from '@assets/imgs/button2.svg';
// import ImgBtn3 from '@assets/imgs/button3.svg';
// import ImgBtn4 from '@assets/imgs/button4.svg';
import ImgUser from '@assets/imgs/user.svg';
import ImgSetting from '@assets/imgs/settings.svg'


const SideBarComponent = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	width: '60px',
	height: '100vh',
	overflowX: 'hidden',
	overflowY: 'auto',
	alignItems: 'center',
	padding: "1.5rem 0.625rem",
	borderRight: `1px solid ${theme.palette.divider}`,
	gap: '1rem',
	background: theme.palette.background.paper,
	'& a, img': { width: '2.5rem', height: '2.5rem' },
	'& svg': { width: '2.5rem', height: '2.5rem', padding: '0.5rem' },
	'& > .logo': {
		// padding: "1rem 0 1rem"
	},
	'& > .nav-container': {
		display: 'flex', flexDirection: 'column',
		// padding: "2.5rem 0 1.25rem",
		gap: '0.25rem',
		'& > a': {
			borderRadius: '100%',
			color: theme.palette.text.disabled,
			'&.active': {
				background: alpha(theme.palette.secondary.light, 0.2),
				color: theme.palette.primary.light,
				borderRadius: 0,
			}
		}
	},
	'& > .setting-container': {
		display: 'flex', flexDirection: 'column',
		// padding: "2.5rem 0 1.25rem",
		gap: '0.75rem'
	}
}))

const LeftSideBar = (props) => {
	const location = useLocation();

	return (
		<SideBarComponent {...props}>
			<Box className='flex logo'>
				<Link to='/'><img src={ImgLogo} alt='Logo img' /></Link>
			</Box>
			<Divider className='w-full' />
			<Box className='nav-container'>
				<Tooltip title="Keyword" placement="right">
					<Link to='/step1' className={location.pathname === '/step1' ? 'active' : ''}>
						<TitleOutlined />
					</Link>
				</Tooltip>
				<Tooltip title="Title" placement="right">
					<Link to='/step2' className={location.pathname === '/step2' ? 'active' : ''}>
						<FormatListNumberedOutlined />
					</Link>
				</Tooltip>
				<Tooltip title="Outline" placement="right">
					<Link to='/step3' className={location.pathname === '/step3' ? 'active' : ''}>
						<ArticleOutlined />
					</Link>
				</Tooltip>
				<Tooltip title="Introduction" placement="right">
					<Link to='/step4' className={location.pathname === '/step4' ? 'active' : ''}>
						<Filter1Outlined />
					</Link>
				</Tooltip>
				<Tooltip title="Body Content" placement="right">
					<Link to='/step5' className={location.pathname === '/step5' ? 'active' : ''}>
						<Filter2Outlined />
					</Link>
				</Tooltip>
				<Tooltip title="Conclusion" placement="right">
					<Link to='/step6' className={location.pathname === '/step6' ? 'active' : ''}>
						<Filter3Outlined />
					</Link>
				</Tooltip>

				<Tooltip title="Final result" placement="right">
					<Link to='/final' className={location.pathname === '/final' ? 'active' : ''}>
						<AssignmentTurnedInOutlined />
					</Link>
				</Tooltip>
				{/* <Link to='/'><img src={ImgBtn1} alt='Button1' /></Link>
				<Link to='/'><img src={ImgBtn2} alt='Button2' /></Link>
				<Link to='/'><img src={ImgBtn3} alt='Button3' /></Link>
				<Link to='/'><img src={ImgBtn4} alt='Button4' /></Link> */}
			</Box>

			<div className='grow' />

			<Box className='setting-container'>
				<Link to='/'><img src={ImgUser} alt='User' /></Link>
				<Link to='/'><img src={ImgSetting} alt='User' /></Link>
			</Box>
		</SideBarComponent>
	)
}

export default LeftSideBar;