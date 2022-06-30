import {
	Avatar,
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	Divider,
	Typography,
} from '@mui/material';

export const AccountProfile = ({ userInfo }) => (
	<Card>
		<CardContent>
			<Box
				sx={{
					alignItems: 'center',
					display: 'flex',
					flexDirection: 'column',
				}}>
				<Avatar
					src={userInfo.image}
					sx={{
						height: 64,
						mb: 2,
						width: 64,
					}}
				/>
				<Typography color='textPrimary' gutterBottom variant='h5'>
					{`${userInfo.first_name} ${userInfo.last_name}`}
				</Typography>
				<Typography color='textSecondary' variant='body2'>
					{`${userInfo.city}, ${userInfo.country}`}
				</Typography>
				<Typography color='textSecondary' variant='body2'>
					SSN: {userInfo.ssn}
				</Typography>
			</Box>
		</CardContent>
		<Divider />
		<CardActions>
			<Button color='primary' fullWidth variant='text'>
				Upload picture
			</Button>
		</CardActions>
	</Card>
);
