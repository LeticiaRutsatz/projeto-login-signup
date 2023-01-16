import React,{useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import { Recado } from '../../store/modules/typeStore';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { atualizarRecado, excluirRecado } from '../../store/modules/userLogged/userSlice';
import { clearInputDesc, editarRecadoDes } from '../../store/modules/userLogged/descricaoSlice';
import { clearInputDet, editarRecadoDet } from '../../store/modules/userLogged/detailSlice';
import { changeBooleanFalse, changeBooleanTrue } from '../../store/modules/buttonEnviar';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function BasicTable() {
    const userLogged = useAppSelector((state) => state.userLogged);
    const inputDesc = useAppSelector((state) => state.inputDesc);
    const inputDetail = useAppSelector((state) => state.inputDetail);
    const buttonEnviar = useAppSelector((state) => state.buttonEnviar);
    const listaUsuarios = useAppSelector((state) => state.users)
    const [changeIcon, setChangeIcon] = useState(Math.random());
    


    const dispatch = useAppDispatch();

    function handleEdit(dado : Recado){
        dispatch(editarRecadoDes(dado));
        dispatch(editarRecadoDet(dado));
        setChangeIcon(dado.changeIcon)

        dispatch(changeBooleanFalse())
    }

    function handleAtt(dado : Recado, index:number){

        const novoRecado: Recado = {
            id: dado.id,
            description: inputDesc,
            detail: inputDetail,
            changeIcon: dado.changeIcon
        }

        dispatch(atualizarRecado(novoRecado));
        clearInput();

        setChangeIcon(Math.random())
        dispatch(changeBooleanTrue())
    }
    
    function handleDelete(indice : number){
       dispatch(excluirRecado(indice));
    }
    
    function clearInput(){
        dispatch(clearInputDet())
        dispatch(clearInputDesc())
    }

    return (
        <Grid container padding={4}>
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
                                    <Grid container sx={{display: 'flex', justifyContent:'center', alignItems: 'center'}}>
                                        <Grid item xs={12} sm={2} >
                                            <IconButton color="primary" sx={{fontSize:'10px', margin:'5px'}}  onClick={() => dado.changeIcon == changeIcon ? handleAtt(dado, index) : handleEdit(dado)}> {dado.changeIcon == changeIcon ? <UpgradeIcon /> : <EditIcon />} </IconButton>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <IconButton color="primary" sx={{fontSize:'10px', margin:'5px'}} onClick={() => handleDelete(index)}><DeleteIcon/> </IconButton>
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
    )
}