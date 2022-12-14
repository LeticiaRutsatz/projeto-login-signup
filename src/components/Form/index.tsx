import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import InputDefault, {Name} from '../InputDefault';
import { Stack, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FormHelperText from '@mui/material/FormHelperText';
import userEvent from '@testing-library/user-event';


interface FormProps {
    mode: 'login' | 'signup';
}

 interface User {
    name: string;
    email: string;
    password: string;
    recados: Recado[];
}

interface Recado {
    id: string;
    description: string;
    detail: string;
}

function Form({mode} : FormProps){
    const navigate = useNavigate();

    const handleNavigate = () => {
        if(mode === 'login') {
            navigate('/signup')
        } else {
            navigate('/login')
        }
    }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [errorName, setErrorName] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [listaUsuarios, setListaUsuarios] = useState<User[]>(JSON.parse(localStorage.getItem('listaUsers') ?? '[]'));

    useEffect(() => {
        if(name.length < 3){
            setErrorName(true);
            <FormHelperText id="component-helper-text">
                Digite acima de 3 caracteres
            </FormHelperText>
        }else{
            setErrorName(false);
        }

        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(!email.match(regexEmail)) {
            setErrorEmail(true)
        }else {
            setErrorEmail(false)
        }

        if(!password || !repassword || password.length < 5 || password !== repassword){
            setErrorPassword(true)
        }else{
            setErrorPassword(false)
        }

    }, [name, email, password, repassword])

    useEffect(() => {
        localStorage.setItem('listaUsers', JSON.stringify(listaUsuarios));
    }, [listaUsuarios])

    function mudarInput(value: string, key: Name) {
        switch (key) {
            case 'name':
                setName(value);
            break;

            case 'email':
                setEmail(value);
            break;

            case 'password':
                setPassword(value);
            break;

            case 'repassword':
                setRepassword(value);
            break;
        }
    }

    function createAccount(){
        const newUser = {
            name,
            email,
            password,
            recados: []
        }
        
       const userExist = listaUsuarios.some((user) => user.email === newUser.email);

       if(!userExist){
        setListaUsuarios([...listaUsuarios, newUser]);
        clearInput();

        alert('Usuário Cadastrado')

        setTimeout(() => {
            navigate('/')
        },1500)

       }else{
        alert('E-mail já em uso!')
       }
    }

    const login = () => {
        const userExist = listaUsuarios.find((user) => user.email === email && user.password === password);

        if(!userExist) {
           const confirma = window.confirm("Usuário não cadastrado. Deseja cadastrar uma conta? ")

           if(confirma) {
                navigate('/signup')
           }
        }

            localStorage.setItem('usuarioLogado', userExist?.email as string)
            
            alert('Login efetuado com sucesso! Redirecionando...')
            setTimeout(() => {
                navigate('/home')
            }, 1500)
    }

    const clearInput = () => {
        setName('');
        setEmail('');
        setPassword('');
        setRepassword('');
    }

    return(
        <>
            <Stack direction="column" spacing={2} sx={{width: '80%'}}>
                { mode === 'signup' && (
                    <>
                        <InputDefault type='name' label='Nome' name='name' value={name} handleChange={mudarInput} color={errorName ? 'error' : 'primary'}/>
                        <InputDefault type='email' label='E-mail' name='email' value={email} handleChange={mudarInput} color={errorEmail ? 'error' : 'primary'}/>
                        <InputDefault type='password' label='Senha' name='password' value={password} handleChange={mudarInput} color={errorPassword ? 'error' : 'primary'}/>
                        <InputDefault type='password' label='Repita a Senha' name='repassword' value={repassword} handleChange={mudarInput} color={errorPassword ? 'error' : 'primary'}/>
                        <Button disabled={errorName || errorEmail || errorPassword === true} variant='contained' color='primary' onClick={createAccount}>Criar Conta</Button>
                    </>
                )}

                { mode === 'login' && (
                    <>
                        <InputDefault type='email' label='E-mail' name='email' value={email} handleChange={mudarInput} color={errorEmail ? 'error' : 'primary'}/>
                        <InputDefault type='password' label='Senha' name='password' value={password} handleChange={mudarInput} color={'primary'}/>
                        <Button disabled={errorEmail} variant='contained' color='primary' onClick={login}>Acessar</Button>
                    </>
                )}
                
            </Stack>
            <Box marginTop={3}>
                { mode === 'login' && ( <Typography color='primary' variant='subtitle2'>Não tem conta? <Typography variant='button' color='primary' sx={{cursor: 'pointer'}} onClick={handleNavigate}>Cadastre-se</Typography></Typography> )}
                { mode === 'signup' && ( <Typography color='primary' variant='subtitle2'>Já tem conta? <Typography variant='button' color='primary' sx={{cursor: 'pointer'}} onClick={handleNavigate}>Fazer Login</Typography></Typography> )}
            </Box>
        </>

    )
}

export default Form;