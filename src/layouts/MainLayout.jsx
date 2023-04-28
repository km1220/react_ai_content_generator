import LeftSidebar from './LeftSideBar';

const MainLayout = ({ children }) => {
	return (
		<div style={{ display: 'flex', minHeight: '100vh' }}>
			{/* Left Sidebar Panel */}
			<LeftSidebar sx={{ position: 'fixed' }} />
			{/* Main Panel */}
			<div style={{ marginLeft: '60px', display: 'flex', flexGrow: 1 }}>
				{children}
			</div>
		</div>
	)
}

export default MainLayout;