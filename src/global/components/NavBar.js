import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MailIcon from '@mui/icons-material/Mail';
// import MoreIcon from '@mui/icons-material/MoreVert';
import { Link } from '@mui/material';
// import Clock from 'react-live-clock';

export default function NavBar() {
	// const { userData, setLoggedIn } = useContext(GlobalContext);
	const [anchorEl, setAnchorEl] = useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	// const handleMobileMenuOpen = (event) => {
	// 	setMobileMoreAnchorEl(event.currentTarget);
	// };

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleLogout = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}>
			{/* <MenuItem onClick={handleMenuClose}>{userData.name}</MenuItem> */}
			<MenuItem onClick={handleLogout}>Sign Out</MenuItem>
		</Menu>
	);

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}>
			<MenuItem>
				<IconButton size='large' aria-label='show 4 new mails' color='inherit'>
					<MailIcon />
				</IconButton>
				<p>Contact Us</p>
			</MenuItem>
		</Menu>
	);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<Link>
						<Typography sx={{ fontWeight: 'bold', color: '#fff' }}>
							BYTE CURRENCY
						</Typography>
					</Link>
					<Box sx={{ flexGrow: 1 }} />
					<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
						{/* <Clock
							format={'HH:mm:ss'}
							ticking={true}
							style={{ fontSize: '2em' }}
						/> */}
						{/* <Link href='/contact'>
							<Typography variant='h6' sx={{ color: '#fff' }}>
								Contact Us
							</Typography>
						</Link> */}
					</Box>
					{/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							color='inherit'>
							<MoreIcon />,
						</IconButton>
					</Box> */}
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</Box>
	);
}
