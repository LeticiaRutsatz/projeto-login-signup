import React,{useState, useEffect} from 'react';
import MainRec from '../../components/Main/mainRec';
import SectionInput from '../../components/SectionInput';
import InputHome, { inputRecado } from '../../components/InputHome';
import SectionH1 from '../../components/SectionH1';
import BasicTable from '../../components/Table';
import ButtonHome from '../../components/Button/ButtonHome';
import Button from '@mui/material/Button';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router/dist';
import { v4 as uuid} from 'uuid';
import { Recado, User } from '../../store/modules/typeStore';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { cadastrarRecado } from '../../store/modules/userLogged/userSlice';
import { logout } from '../../store/modules/users/usersSlice';
import { mudarValueDesc } from '../../store/modules/userLogged/descricaoSlice';
import { mudarValueDet } from '../../store/modules/userLogged/detailSlice';




function HomeRecados(){

    const navigate = useNavigate();
    const userLogged = useAppSelector((state) => state.userLogged);
    const inputDesc = useAppSelector((state) => state.inputDesc);
    const inputDetail = useAppSelector((state) => state.inputDetail);

    const dispatch = useAppDispatch();

    if(!userLogged) {
        navigate('/')
    }

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
            detail: inputDetail,
        }

        dispatch(cadastrarRecado(novoRecado));
        
    }

    const Logout = () => {
        if(userLogged){
            dispatch(logout(userLogged));
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
                <ButtonHome onclick={sendInputs}/>
            </SectionInput>
            <BasicTable />
            <Button variant="contained" color="error" startIcon={<LogoutIcon />} onClick={Logout} sx={{marginLeft: '1rem'}}>Logout</Button>
        </MainRec>
    )
}

export default HomeRecados;