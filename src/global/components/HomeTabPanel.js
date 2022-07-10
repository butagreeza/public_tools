import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import { AppBar, Paper, Tabs, Tab, Typography, Box } from '@mui/material';
import LeonesConverter from '../../pages/home/components/LeonesConverter';
import ExchangeRates from '../../pages/home/components/ExchangeRates';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}

export default function HomeTabPanel() {
	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleChangeIndex = (index) => {
		setValue(index);
	};

	return (
		<Box sx={{ bgcolor: 'background.paper' }}>
			<AppBar position='static'>
				<Tabs
					value={value}
					onChange={handleChange}
					indicatorColor='secondary'
					textColor='inherit'
					variant='fullWidth'
					aria-label='full width tabs example'>
					<Tab label='Leone Converter' {...a11yProps(0)} />
					<Tab label='Global Exchange Rates' {...a11yProps(1)} />
				</Tabs>
			</AppBar>
			<Paper elevation={3}>
				<SwipeableViews
					axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
					index={value}
					onChangeIndex={handleChangeIndex}>
					<TabPanel value={value} index={value} dir={theme.direction}>
						<LeonesConverter />
					</TabPanel>
					<TabPanel value={value} index={value} dir={theme.direction}>
						<ExchangeRates />
					</TabPanel>
				</SwipeableViews>
			</Paper>
		</Box>
	);
}
