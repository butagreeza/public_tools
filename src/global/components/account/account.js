// import Head from 'next/head';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import { AccountProfile } from './account-profile';
import { AccountProfileDetails } from './account-profile-details';

import {
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalProvider';

const Account = ({ userInfo }) => {
	const { setMoreInfo } = useContext(GlobalContext);
	return (
		<>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
				}}>
				<Container maxWidth='lg'>
					<Grid>
						<List>
							<ListItem>
								<ListItemButton
									onClick={() => setMoreInfo(false)}
									sx={{ width: '10%' }}>
									<ListItemIcon>
										<ArrowBackIcon />
									</ListItemIcon>
								</ListItemButton>
								<ListItemText
									sx={{
										width: '90%',
									}}
									disableTypography
									primary={<Typography variant='h4'>Account</Typography>}
								/>
							</ListItem>
						</List>
					</Grid>
					<Divider />
					<Grid container spacing={3} sx={{ mt: 2 }}>
						<Grid item lg={4} md={6} xs={12}>
							<AccountProfile userInfo={userInfo} />
						</Grid>
						<Grid item lg={8} md={6} xs={12}>
							<AccountProfileDetails userInfo={userInfo} />
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
};

Account.getLayout = (page) => <>{page}</>;

export default Account;
