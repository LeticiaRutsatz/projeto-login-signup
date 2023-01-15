import React,{useState, useEffect} from 'react';
import InputHome, { inputRecado } from '../../components/InputHome';
import BasicTable from '../../components/Table';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router/dist';
import { v4 as uuid} from 'uuid';
import { Recado, User } from '../../store/modules/typeStore';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { cadastrarRecado, excluirLogado } from '../../store/modules/userLogged/userSlice';
import { logout } from '../../store/modules/users/usersSlice';
import { clearInputDesc, mudarValueDesc } from '../../store/modules/userLogged/descricaoSlice';
import { clearInputDet, mudarValueDet } from '../../store/modules/userLogged/detailSlice';
import { blue, grey } from '@mui/material/colors';
import { Grid } from '@mui/material';




function HomeRecados(){

    const navigate = useNavigate();
    const userLogged = useAppSelector((state) => state.userLogged);
    const inputDesc = useAppSelector((state) => state.inputDesc);
    const inputDetail = useAppSelector((state) => state.inputDetail);
    const buttonEnviar = useAppSelector((state) => state.buttonEnviar);

    const dispatch = useAppDispatch();

    useEffect(() =>{
        if (userLogged.email === ''){
            navigate('/')
        }
    },[userLogged])

    function mudaInputDesc(event : string) {
        dispatch(mudarValueDesc(event));
    }

    function mudaInputDet(event : string) {
        dispatch(mudarValueDet(event));
    }

    const sendInputs = () => {
        const novoRecado: Recado = {
            id: uuid(),
            description: inputDesc,
            detail: inputDetail
        }

        dispatch(cadastrarRecado(novoRecado));
        dispatch(clearInputDet())
        dispatch(clearInputDesc())
        
    }

    const Logout = () => {
        if(userLogged){
            dispatch(logout(userLogged));
            dispatch(excluirLogado());
            navigate('/')
        }
    }

    return(

        <Grid container sx={{
                margin: 'none',
                backgroundColor: '#ffff',
            }}>
            <Grid item xs={12} sx={{
                height: {xs:'15vh', md:'20vh'},
                alignItems: 'flex-end',
                paddingLeft: '4%',
                paddingTop: '4rem',
                backgroundColor: '#2c73d9',
                color: '#fff',
                fontSize: '1rem'
            }}>
                <h1>Sistema de Recados</h1>
            </Grid>
            <Grid item xs={12} md={5} sx={{
                height: {xs:'10vh', md:'20vh'},
                backgroundColor: '#2c73d9',
                borderRadius: {md:'0px 0px 0px 20px'},
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <InputHome label='Descrição' name='Description' type='text' value={inputDesc} handleChange={mudaInputDesc}/>
            </Grid>
            <Grid item xs={12} md={5} sx={{
                height: {xs:'10vh', md:'20vh'},
                backgroundColor: '#2c73d9',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <InputHome label='Detalhamento' name='Detail' type='text' value={inputDetail} handleChange={mudaInputDet}/>
            </Grid >
            <Grid item xs={12} md={2} sx={{
                height: {xs:'10vh', md:'20vh'},
                backgroundColor: '#2c73d9',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: {md:'0px 0px 20px 0px'},
            }}>
                <Button  variant="contained" endIcon={<SendIcon />} sx={{ width: '50%', height: '3rem', color: grey[50], backgroundColor: blue[900]}} disabled={buttonEnviar == false} onClick={sendInputs}>Enviar</Button>
            </Grid>
            <Grid item xs={12}>
                <BasicTable />
            </Grid>
            <Grid item>
                <Button variant="outlined" color="error" startIcon={<LogoutIcon />} onClick={Logout} sx={{marginLeft: '2rem', marginBottom:'2rem'}}>Logout</Button>
            </Grid>
        </Grid>   
    )
}

export default HomeRecados;