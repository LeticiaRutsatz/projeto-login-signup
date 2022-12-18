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
import { User, Recado } from '../../config/types';


export default function BasicTable() {
    const [userLogged, setUserLogged] = useState<User | null>(JSON.parse(localStorage.getItem('usuarioLogado') ?? 'null'));

    function handleEdit(recado : Recado){
        console.log('clicou no recado ', recado)
    }

    useEffect(
        () => {
            localStorage.setItem('usuarioLogado', JSON.stringify(userLogged));
            console.log(userLogged)
        },

        [userLogged]
    )
    
    function handleDelete(indice : number){
       userLogged?.recados.splice(indice, 1);
       
       if(userLogged) {
            setUserLogged({ ...userLogged, recados: [...userLogged.recados]});
            console.log(userLogged);
        }
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
                        {userLogged?.recados.map((dado, index) => (
                            <TableRow
                                key={dado.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, Color:'#fff',  backgroundColor: '#045ee441' }}
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