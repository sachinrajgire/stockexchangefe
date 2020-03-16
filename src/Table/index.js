import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Fade from '@material-ui/core/Fade';


const useStyles = makeStyles({
  root: {
    width: '95%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  mow :{
    fontWeight:'600',
    transition: 'all 5s ease-in 5s'
  }
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
          {data.map((row,index) => (
            // <div className={classes.row}>
            
              <TableRow key={`${row.f0}${index}`} onClick={handler}>
                {Object.values(row).map((i,idx)=>{                     
                      return <TableCell className={classes.mow} key={`${idx}abc`} >
                      {i}
                      </TableCell>
                      })} 
              
            </TableRow>
          
            // </div>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
