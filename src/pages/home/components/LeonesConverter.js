import React from 'react';
import {
	TextField,
	Button,
	Stack,
	Grid,
	Typography,
	Alert,
} from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import converter from 'number-to-words';

const LeonesConverter = () => {
	const [amount, setAmount] = React.useState('');
	const [newAmount, setNewAmount] = React.useState({
		figure: '',
		inWords: '',
	});
	const [cent, setCent] = React.useState(false);

	const handleKeyPress = (e) => {
		if (e.key === '.') {
			e.preventDefault();
		}
	};
	const handleReset = () => {
		setAmount('');
		setNewAmount('');
		setCent(false);
		return;
	};
	const checkField = (val) => {
		var hasNumber = /\d/;

		if (!amount) {
			return (
				<Alert severity='error'>This is an error alert — check it out!</Alert>
			);
		}
		if (!hasNumber.test(amount)) {
			return (
				<Alert severity='error'>This is an error alert — check it out!</Alert>
			);
		}
		if (amount.replace(/\D/g, '').length > 19) {
			return (
				<Alert severity='error'>This is an error alert — check it out!</Alert>
			);
		} else {
			handleConversion(val);
		}
	};

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	const handleConversion = (new_old) => {
		let val = Number(amount.replace(/\D/g, ''));

		if (new_old === 'old') {
			setCent(false);
			let new_val = val * 1000;
			setNewAmount({
				inWords: capitalizeFirstLetter(`${converter.toWords(new_val)} Leones`),
				figure: new_val,
			});
			return;
		} else {
			if (val.toString().length <= 3) {
				setCent(true);
				let new_val = val / 10;
				setNewAmount({
					inWords: `${
						new_val < 1
							? ''
							: capitalizeFirstLetter(`${converter.toWords(new_val)} Cent`)
					}`,
					figure: new_val,
				});
			} else {
				setCent(false);
				function toFixed(x) {
					if (Math.abs(x) < 1.0) {
						let e = parseInt(x.toString().split('e-')[1]);
						if (e) {
							x *= Math.pow(10, e - 1);
							x = '0.' + new Array(e).join('0') + x.toString().substring(2);
						}
					} else {
						let e = parseInt(x.toString().split('+')[1]);
						if (e > 20) {
							e -= 20;
							x /= Math.pow(10, e);
							x += new Array(e + 1).join('0');
						}
					}
					return x;
				}
				function toFixedTrunc(x, n) {
					x = toFixed(x);
					const v = (typeof x === 'string' ? x : x.toString()).split('.');
					if (n <= 0) return v[0];
					let f = v[1] || '';
					if (f.length > n) return `${v[0]}.${f.substr(0, n)}`;
					while (f.length < n) f += '0';
					return `${v[0]}.${f}`;
				}
				let new_val = toFixedTrunc(val / 1000, 2);
				let cent_val = Number(new_val.toString().split('.').pop());

				if (cent_val && new_val % 1 !== 0) {
					let c_val = cent_val;
					setNewAmount({
						inWords: capitalizeFirstLetter(
							`${converter.toWords(new_val)} Leones ${
								c_val < 1
									? ''
									: '-' +
									  ' ' +
									  capitalizeFirstLetter(converter.toWords(c_val)) +
									  ' cents'
							}`,
						),
						figure: new_val,
					});
				} else {
					setNewAmount({
						inWords: capitalizeFirstLetter(
							`${converter.toWords(new_val)} Leones`,
						),
						figure: new_val,
					});
				}
			}
		}
	};
	return (
		<Grid item xs={8}>
			<Grid container sx={{ padding: 3 }}>
				<Grid item xs={12}>
					<TextField
						autoFocus
						margin='dense'
						value={amount}
						type='number'
						pattern='[1-9]{1}[0-9]{9}'
						inputProps={{
							min: '1',
							max: '1000',
							step: '1',
						}}
						onKeyDown={handleKeyPress}
						fullWidth
						onChange={(e) => setAmount(e.target.value)}
						sx={{ width: '100%' }}
						id='amount'
						label='Amount (Le.)'
						variant='outlined'
					/>
				</Grid>
				<Stack
					spacing={2}
					direction='row'
					sx={{
						width: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						marginY: 2,
					}}>
					<Button
						onClick={() => checkField('new')}
						sx={{ width: '100%' }}
						variant='contained'>
						Convert to New Leones
					</Button>
					<Button
						onClick={() => checkField('old')}
						sx={{ width: '100%' }}
						color='success'
						variant='contained'>
						Convert to Old Leones
					</Button>
				</Stack>
				{!newAmount.figure ? null : (
					<>
						<Grid
							item
							xs={12}
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}>
							<CompareArrowsIcon fontSize='large' color='success' />
						</Grid>
						<Grid item xs={12}>
							<div style={{ alignItems: 'center' }}>
								<Typography style={{ color: '#000', fontWeight: 'bold' }}>
									CONVERSION AMOUNT
								</Typography>
								{cent ? (
									<Typography style={{ color: '#000', fontSize: 30 }}>
										{newAmount.figure
											.toString()
											.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
										cent
									</Typography>
								) : (
									<div style={{ flexDirection: 'row' }}>
										<Typography style={{ color: '#000', fontSize: 30 }}>
											Le.{' '}
											{newAmount.figure
												.toString()
												.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
										</Typography>
										{/* <IconButton
													icon={() => (
														<Ionicons
															name='copy-outline'
															size={20}
															color='grey'
														/>
													)}
													size={20}
													onPress={() => copyToClipboard()}
												/> */}
									</div>
								)}

								<Typography style={{ color: 'grey' }}>
									{newAmount.inWords}
								</Typography>
								<Button
									style={{
										backgroundColor: 'red',
										width: '80%',
										marginTop: 15,
									}}
									onClick={() => handleReset()}>
									<Typography style={{ color: '#fff' }}>Reset</Typography>
								</Button>
							</div>
						</Grid>
					</>
				)}
			</Grid>
		</Grid>
	);
};

export default LeonesConverter;
