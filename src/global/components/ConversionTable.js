import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.primary.main,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

function createData(curr_type, old_leone, new_leone) {
	return { curr_type, old_leone, new_leone };
}

const rows = [
	createData('Notes', '1,000', '1'),
	createData('', '2,000', '2'),
	createData('', '5,000', '5'),
	createData('', '10,000', '10'),
	createData('', '20,000', '20'),
	createData('Coins', '10', '1 cent'),
	createData('', '50', '5 cent'),
	createData('', '100', '10 cent'),
	createData('', '500', '50 cent'),
];

export default function ConversionTable() {
	return (
		<TableContainer component={Paper}>
			<Table aria-label='currenct-table'>
				<TableHead>
					<TableRow>
						<StyledTableCell>Currency</StyledTableCell>
						<StyledTableCell>Old Leones</StyledTableCell>
						<StyledTableCell>New Leones</StyledTableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<StyledTableRow key={row.curr_type}>
							<StyledTableCell key={row.old_leone} component='th' scope='row'>
								{row.curr_type}
							</StyledTableCell>
							<StyledTableCell>{row.old_leone}</StyledTableCell>
							<StyledTableCell>{row.new_leone}</StyledTableCell>
						</StyledTableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
