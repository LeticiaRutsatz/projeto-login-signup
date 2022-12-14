import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function createData(
  id: string,
  description: string,
  details: string
  
) {
  return { id, description, details};
}

const rows = [
  createData('1', 'compras no mercado', 'R$12'),
  createData('2', 'material escolar', 'R$152'),
  createData('3', 'arrumar carro', 'R$3.689'),
 
];

function handleEdit(id : string){
    console.log('clicou em id ', id)
}

function handleDelete(id : string){
    console.log('clicou em id ', id)
}

export default function BasicTable() {
  return (
    <Grid container paddingX={8}>
        <Grid xs={12}>
            <TableContainer component={Paper} sx={{display:'flex', justifyContent:'center', marginTop: '2rem'}}>
                <Table sx={{ backgroundColor: '#045ee4ab',}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell align="center">Descrição</TableCell>
                            <TableCell align="center">Detalhamento</TableCell>
                            <TableCell align="center">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, Color:'#fff' }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.id}
                                </TableCell>
                                <TableCell align="center">{row.description}</TableCell>
                                <TableCell align="center">{row.details}</TableCell>
                                <TableCell align="center">
                                    <Grid container sx={{display: 'flex', justifyContent:'center'}}>
                                        <Grid item xs={5} md={6} >
                                            <Button variant="contained" endIcon={<EditIcon />} sx={{ width: '5rem', height: '2rem', fontSize:'10px'}} onClick={() => handleEdit(row.id)} >Editar</Button>
                                        </Grid>
                                        <Grid item xs={5} md={3}>
                                            <Button variant="contained" endIcon={<DeleteIcon/>} sx={{ width: '5rem', height: '2rem', fontSize:'10px'}} onClick={() => handleDelete(row.id)} >Apagar</Button>
                                        </Grid>
                                    </Grid> 
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
  );
}