import { Box, Grid, Paper } from '@mui/material';
import React from 'react';
import ConversionTable from '../../global/components/ConversionTable';
import '../../global/styles/GlobalStyles.css';
import HomeTabPanel from '../../global/components/HomeTabPanel';
// let styles = {
// 	title: {
// 		display: 'flex',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		TypographyAlign: 'center',
// 		verticalAlign: 'middle',
// 		boxShadow: 2,
// 		height: 60,
// 	},
// };
const Home = () => {
	return (
		<Box sx={{ flexGrow: 1, marginTop: 10, paddingX: { md: 10, sm: 5 } }}>
			{/* <Grid item xs={12}>
				<Typography variant='h4' sx={{ fontWeight: 'bold' }}>
					New-Old Leone Converter
				</Typography>
			</Grid> */}
			<div class='flex-container'>
				<div class='flex-item-left'>
					<HomeTabPanel />
				</div>
				<div class='flex-item-right'>
					<Grid item xs={4}>
						<Paper>
							<ConversionTable />
						</Paper>
					</Grid>
				</div>
			</div>
		</Box>
	);
};

export default Home;
