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
import { User, Recado } from '../../config/types';
import { v4 as uuid} from 'uuid';



function HomeRecados(){

    const navigate = useNavigate();
    const [listaUsuarios, setListaUsuarios] = useState<User[]>(JSON.parse(localStorage.getItem('listaUsers') ?? '[]'));
    const [userLogged, setUserLogged] = useState<User | null>(JSON.parse(localStorage.getItem('usuarioLogado') ?? 'null'));
    const [valueDesc, setValueDesc] = useState('');
    const [valueDetail, setValueDetail] = useState('');

    useEffect(
        () => {
            if(!userLogged) {
                navigate('/')
            } 

            localStorage.setItem('usuarioLogado', JSON.stringify(userLogged));
            console.log(userLogged)
        },
       
        [navigate, userLogged, userLogged?.recados]
    )

    useEffect(
        () => {
            localStorage.setItem('listaUsers', JSON.stringify(listaUsuarios));
            console.log(listaUsuarios)
        },
       
        [listaUsuarios]
    )

    function mudaInput(value: string, key: inputRecado) {
        switch (key) {
            case 'Description':
                setValueDesc(value);
            break;

            case 'Detail':
                setValueDetail(value);
            break;

            default:
        }
    }

    const sendInputs = () => {
        const novoRecado: Recado = {
            id: uuid(),
            description: valueDesc,
            detail: valueDetail,
        }

        if(userLogged) {
            setUserLogged({ ...userLogged, recados: [...userLogged.recados, novoRecado]});
            handleClear();
        }
    }

    const handleClear = () => {
        setValueDesc('')
        setValueDetail('')
    }

    const Logout = () => {
        if(userLogged){
            const index = listaUsuarios.findIndex((user) => user.email === userLogged.email);
            listaUsuarios[index] = userLogged;
            setListaUsuarios(listaUsuarios);

            console.log(listaUsuarios)

            navigate('/')
        }
    }

    return(
        <MainRec>
            <SectionH1>
                <h1>Sistema de Recados</h1>
            </SectionH1>
            <SectionInput>
                <InputHome label='Descrição' name='Description' type='text' value={valueDesc} handleChange={mudaInput}/>
                <InputHome label='Detalhamento' name='Detail' type='text' value={valueDetail} handleChange={mudaInput}/>
                <ButtonHome onclick={sendInputs}/>
            </SectionInput>
            <BasicTable />
            <Button variant="contained" color="error" startIcon={<LogoutIcon />} onClick={Logout} sx={{marginLeft: '1rem'}}>Logout</Button>
        </MainRec>
    )
}

export default HomeRecados;