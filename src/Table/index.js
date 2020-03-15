import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  root: {
    width: '95%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});



export default function CustomTable({data,handler}) {
    // console.log(data,'data coming into useTable')
  const classes = useStyles();
  const [firstRow] =data

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
      
            <TableRow >
                {firstRow && Object.keys(firstRow).map((i,idx)=>{                     
                      return <TableCell key={idx} >
                      {i}
                      </TableCell>
                      })} 
              
            </TableRow>
        
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.f0} onClick={handler}>
                {Object.values(row).map((i,idx)=>{                     
                      return <TableCell key={idx} >
                      {i}
                      </TableCell>
                      })} 
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
