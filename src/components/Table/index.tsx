import React,{useState, useEffect} from 'react';
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
import { Recado } from '../../store/modules/typeStore';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { editarRecado, excluirRecado } from '../../store/modules/userLogged/userSlice';
import { editarRecadoDes } from '../../store/modules/userLogged/descricaoSlice';

export default function BasicTable() {
    const userLogged = useAppSelector((state) => state.userLogged);
    const inputDesc = useAppSelector((state) => state.inputDesc);
    const inputDetail = useAppSelector((state) => state.inputDetail);

    const dispatch = useAppDispatch();

    function handleEdit(dado : Recado){
         dispatch(editarRecadoDes(dado));
    }
    
    function handleDelete(indice : number){
       dispatch(excluirRecado(indice));
    }
    
  return (
    <Grid container paddingX={2}>
        <Grid xs={12}>
            <TableContainer component={Paper} sx={{display:'flex', justifyContent:'center', marginTop: '2rem', marginBottom: '2rem'}}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#045ee4ab'}}>
                            <TableCell>ID</TableCell>
                            <TableCell align="center">Descrição</TableCell>
                            <TableCell align="center">Detalhamento</TableCell>
                            <TableCell align="center">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userLogged?.recados.map((dado : Recado, index : number) => (
                            <TableRow
                                key={dado.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, Color:'#fff',  backgroundColor: '#045ee441'}}
                            >
                                <TableCell component="th" scope="row">{index + 1}</TableCell>
                                <TableCell align="center">{dado.description}</TableCell>
                                <TableCell align="center">{dado.detail}</TableCell>
                                <TableCell align="center">
                                    <Grid container sx={{display: 'flex', justifyContent:'center'}}>
                                        <Grid item xs={12} sm={6} >
                                            <Button variant="contained" endIcon={<EditIcon />} sx={{ width: '5rem', height: '2rem', fontSize:'10px', margin:'5px'}} onClick={() => handleEdit(dado)} >Editar</Button>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Button variant="contained" endIcon={<DeleteIcon/>} sx={{ width: '5rem', height: '2rem', fontSize:'10px', margin:'5px'}} onClick={() => handleDelete(index)} >Apagar</Button>
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