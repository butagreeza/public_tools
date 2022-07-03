import React, { useState, useEffect } from 'react';
import {
	TextField,
	Button,
	Stack,
	Grid,
	Typography,
	Alert,
	IconButton,
	InputLabel,
	MenuItem,
	FormControl,
	Select,
} from '@mui/material';

import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import converter from 'number-to-words';
import axios from 'axios';
import currency_list from '../../../global/data/countries.json';
import CurrencyFlag from 'react-currency-flags';

const ExchangeRates = () => {
	const [amount, setAmount] = useState('');
	const [currValues, setCurrValues] = useState({
		convert_from: 'SLL',
		convert_to: 'USD',
	});
	const [convAmount, setConvAMount] = useState({ figure: '', words: '' });
	const [rate, setRate] = useState('');

	const [currencies, setCurrencies] = useState([]);

	const onCurrencySwap = () => {
		setCurrValues({
			...currValues,
			convert_from: currValues.convert_to,
			convert_to: currValues.convert_from,
		});
	};

	const handleCurrencyChange = (e, direction) => {
		if (direction === 'from') {
			setCurrValues({ ...currValues, convert_from: e.target.value });
		} else {
			setCurrValues({
				...currValues,
				convert_to: e.target.value,
			});
		}
	};

	const convertCurrency = async (fromCurrency, toCurrency, convAmount) => {
		fromCurrency = encodeURIComponent(fromCurrency);
		toCurrency = encodeURIComponent(toCurrency);

		var url = `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}`;
		try {
			await axios
				.get(url)
				.then((response) => {
					let res = response.data;
					if (res.success) {
						console.log('RESSS', res);
						let converted_val = res.result * Number(convAmount);
						if (toCurrency === 'SLL') {
							let new_leones = (converted_val / 1000).toFixed(6);
							setConvAMount({
								...convAmount,
								figure: `${new_leones} ${toCurrency}`,
								words:
									new_leones < 1
										? ''
										: capitalizeFirstLetter(
												`${converter.toWords(new_leones)} ${toCurrency}`,
										  ),
							});
							setRate(`1 ${fromCurrency} = ${res.result} ${toCurrency}`);
							console.log('SSL', new_leones, 'OLD', converted_val);
							return;
						}
						if (fromCurrency === 'SLL') {
							let new_leones = (converted_val * 1000).toFixed(6);
							setConvAMount({
								...convAmount,
								figure: `${new_leones} ${toCurrency}`,
								words:
									new_leones < 1
										? ''
										: capitalizeFirstLetter(
												`${converter.toWords(new_leones)} ${toCurrency}`,
										  ),
							});
							setRate(`1 ${fromCurrency} = ${res.result} ${toCurrency}`);

							console.log('SSL', new_leones);
							return;
						} else {
							setConvAMount({
								...convAmount,
								figure: `${converted_val.toFixed(6)} ${toCurrency}`,
								words:
									converted_val < 1
										? ''
										: capitalizeFirstLetter(
												`${converter.toWords(converted_val)} ${toCurrency}`,
										  ),
							});
							setRate(`1 ${fromCurrency} = ${res.result} ${toCurrency}`);

							console.log('OTHER', converted_val);
						}
						return;
					} else {
						alert('Could not convert');
					}
				})
				.catch((e) => {
					console.log('Got an error: ', e);
				});
		} catch {
			alert('Could not convert');
		}
	};

	// console.log('CURR', currency_list.results);

	useEffect(() => {
		// getCurrencies();
		setCurrencies(currency_list);
	}, []);

	const handleKeyPress = (e) => {
		if (e.key === '.') {
			e.preventDefault();
		}
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
			convertCurrency(currValues.convert_from, currValues.convert_to, amount);
		}
	};

	function capitalizeFirstLetter(string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	console.log(
		'BABAM',
		convAmount.figure.replace(/(?<!(\.\d*|^.{0}))(?=(\d{3})+(?!\d))/g, ','),
	);

	return (
		<Grid item xs={8}>
			<Grid container sx={{ padding: 3 }}>
				<Stack
					direction={{ xs: 'column', sm: 'row' }}
					spacing={{ xs: 1, sm: 2, md: 4 }}
					sx={{
						alignItems: 'center',
						width: '100%',
					}}>
					<FormControl sx={{ m: 1, width: '100%' }}>
						<InputLabel id='from'>From</InputLabel>
						<Select
							labelId='from'
							id='from'
							value={currValues.convert_from}
							label='From'
							onChange={(e) => handleCurrencyChange(e, 'from')}>
							<MenuItem value=''>
								<em>None</em>
							</MenuItem>

							{Object.entries(currencies)
								.sort((a, b) =>
									a[1].currencyName.localeCompare(b[1].currencyName),
								)
								.map((currency) => (
									<MenuItem key={currency[1].id} value={currency[1].id}>
										<CurrencyFlag
											currency={
												currency[1].id === currValues.convert_from
													? currValues.convert_from
													: currency[1].id
											}
											size='md'
										/>
										{currency[1].currencyName}
									</MenuItem>
								))}
						</Select>
					</FormControl>

					<IconButton
						size='medium'
						onClick={() => onCurrencySwap()}
						sx={{
							borderRadius: '50%',
							borderStyle: 'solid',
							borderWidth: '2px',
							borderColor: '#2196f3',
						}}>
						<CompareArrowsIcon fontSize='medium' color='primary' />
					</IconButton>

					<FormControl sx={{ m: 1, width: '100%' }}>
						<InputLabel id='to'>To</InputLabel>
						<Select
							labelId='to'
							id='to'
							value={currValues.convert_to}
							label='To'
							onChange={(e) => handleCurrencyChange(e, 'to')}>
							{Object.entries(currencies)
								.sort((a, b) =>
									a[1].currencyName.localeCompare(b[1].currencyName),
								)
								.map((currency) => (
									<MenuItem key={currency[1].id} value={currency[1].id}>
										<CurrencyFlag
											currency={
												currency[1].id === currValues.convert_to
													? currValues.convert_to
													: currency[1].id
											}
											size='md'
										/>
										{currency[1].currencyName}
									</MenuItem>
								))}
						</Select>
					</FormControl>
				</Stack>
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
						label='Amount'
						variant='outlined'
					/>
					<Button
						onClick={() => checkField()}
						sx={{ width: '40%', height: 60 }}
						color='primary'
						variant='contained'>
						Convert
					</Button>
				</Stack>
				{!convAmount.figure ? null : (
					<>
						<Grid item xs={12}>
							<div style={{ alignItems: 'left' }}>
								<Typography style={{ color: '#000', fontWeight: 'bold' }}>
									CONVERSION AMOUNT
								</Typography>

								<div style={{ flexDirection: 'row' }}>
									<Typography style={{ color: '#000', fontSize: 30 }}>
										{convAmount.figure.replace(
											/(?<!(\.\d*|^.{0}))(?=(\d{3})+(?!\d))/g,
											',',
										)}
									</Typography>
									<Typography> {rate ? rate : ''}</Typography>
								</div>

								<Typography style={{ color: 'grey' }}>
									{convAmount.words}
								</Typography>
							</div>
						</Grid>
					</>
				)}
			</Grid>
		</Grid>
	);
};

export default ExchangeRates;
