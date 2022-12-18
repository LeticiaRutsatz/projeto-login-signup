import {createSlice} from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { User, Users } from './types/typesStore';
import { useNavigate } from 'react-router/dist';

interface Banco {
    listaUsuarios: Users[];
}

const initialState: Banco = {
    listaUsuarios: JSON.parse(localStorage.getItem('listaUsers') ?? '[]')
}

const bancoUsuarios = createSlice({
    name: 'bancoUsuarios',
    initialState: initialState,
    reducers:{
        createAccount(state : Users, novoUsuario: User){
            
        const navigate = useNavigate(); 
           const userExist = state.some((user) => user.email === novoUsuario.email);
    
           if(!userExist){
            return [...state, novoUsuario]

            //clearInput(); 
            alert('Usuário Cadastrado')
    
            setTimeout(() => {
                navigate('/')
            },1500)
    
           }else{
            alert('E-mail já em uso!')
           }

        },
        atualizarUser(){},
    }
});

export const {createAccount} = bancoUsuarios.actions;
export default bancoUsuarios.reducer;