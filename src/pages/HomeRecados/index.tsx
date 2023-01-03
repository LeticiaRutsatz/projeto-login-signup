import React,{useState, useEffect} from 'react';
import MainRec from '../../components/Main/mainRec';
import SectionInput from '../../components/SectionInput';
import InputHome, { inputRecado } from '../../components/InputHome';
import SectionH1 from '../../components/SectionH1';
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
        <MainRec>
            <SectionH1>
                <h1>Sistema de Recados</h1>
            </SectionH1>
            <SectionInput>
                <InputHome label='Descrição' name='Description' type='text' value={inputDesc} handleChange={mudaInputDesc}/>
                <InputHome label='Detalhamento' name='Detail' type='text' value={inputDetail} handleChange={mudaInputDet}/>
                <Button  variant="contained" endIcon={<SendIcon />} sx={{ width: '7rem', height: '3rem', color: grey[50], backgroundColor: blue[900]}} disabled={buttonEnviar == false} onClick={sendInputs}>Enviar</Button>
            </SectionInput>
            <BasicTable />
            <Button variant="outlined" color="error" startIcon={<LogoutIcon />} onClick={Logout} sx={{marginLeft: '2rem'}}>Logout</Button>
        </MainRec>
    )
}

export default HomeRecados;