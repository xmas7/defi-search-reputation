import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { RadioRounded } from '@material-ui/icons';

const useStyles = makeStyles(() => ({
  container: {
    maxHeight: '500px',
    overFlow: 'auto',
  },
  table: {
    minWidth: '50%',
    borderRadius: 20,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: 'rgb(44 54 69)',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    color: theme.palette.common.black,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(type, name, balance) {
  return {type, name, balance};
}

/**
 * component to display the Table
 * 
 * @param {Object} props
 */
const CustomizedTable = props => {
  // const {  rows } = props;

  let rows = props.rows;
  if (!rows) rows = [];
  while(rows.length < 5) rows.push({type: '', name: '', balance: ''});

  const classes = useStyles();
    return (
      <TableContainer component={Paper} className={classes.container}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Token</StyledTableCell>
              <StyledTableCell align="center">Amount</StyledTableCell>
              <StyledTableCell align="center">AmountUSD</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows && props.rows.map((row) => (
              <StyledTableRow>
                <StyledTableCell component="th" align="center" scope="row">
                  {row.type}
                </StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.balance}</StyledTableCell>
                <StyledTableCell align="center">{row.balanceUSD}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
}

export default CustomizedTable;

