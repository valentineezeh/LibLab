import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export const BaseTable = ({ cells, children }: { cells: Array<string>, children: React.ReactNode}) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ maxHeight: 900 }}>
      <Table
        sx={{ minWidth: 700 }}
        stickyHeader aria-label="sticky table"
        >
        <TableHead>
          <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>{cells[0]}</TableCell>
              {
                cells?.slice(1)?.map((cell) => (
                  <TableCell
                    align="right"
                    key={cell}
                    sx={{
                      fontWeight: 'bold',
                      fontSize: '1rem'
                    }}
                  >
                    {cell}
                </TableCell>
                ))
              }
          </TableRow>
        </TableHead>
        <TableBody>
          {children}
        </TableBody>
        </Table>
    </TableContainer>
    </Paper>
  )
}
