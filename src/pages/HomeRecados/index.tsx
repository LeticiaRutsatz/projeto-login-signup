import React,{useState, useEffect} from 'react';
import MainRec from '../../components/Main/mainRec';
import SectionInput from '../../components/SectionInput';
import InputHome, { inputRecado } from '../../components/InputHome';
import SectionH1 from '../../components/SectionH1';
import BasicTable from '../../components/Table';
import ButtonHome from '../../components/Button/ButtonHome';
import { useNavigate } from 'react-router';
import { User, Recado } from '../../config/types';
import { v4 as uuid} from 'uuid';

function HomeRecados(){

    const navigate = useNavigate();
    const [userLogged, setUserLogged] = useState<User | null>(JSON.parse(localStorage.getItem('usuarioLogado') ?? 'null'));
    const [valueDesc, setValueDesc] = useState('');
    const [valueDetail, setValueDetail] = useState('');

    useEffect(
        () => {
            if(!userLogged) {
                navigate('/')
            } 
        },

       
        [navigate, userLogged]
    )

    function mudaInput(value: string, key: inputRecado) {
        switch (key) {
            case 'Description':
                setValueDesc(value);
                console.log(value)
            break;

            case 'Detail':
                setValueDetail(value);
                console.log(value)
            break;
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
            console.log(userLogged)
        }
    }

    const handleClear = () => {
        setValueDesc('')
        setValueDetail('')
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
        </MainRec>
    )
}

export default HomeRecados;