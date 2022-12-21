import React from 'react';
import { TextField } from '@mui/material';

interface InputProps {
    type: string;
    name: inputRecado;
    label: string;
    value: string;
    handleChange: (value: string, key: inputRecado) => void;
}

export type inputRecado = 'Description' | 'Detail';

function InputHome({name, type, label, value, handleChange} : InputProps){
    return(
        <TextField color='info' name={name} label={label} variant="outlined" type={type} value={value} sx={{ width: '30%'}} onChange={(ev) => handleChange(ev.target.value, name)} />
    )
}

export default InputHome;