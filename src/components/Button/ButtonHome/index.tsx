import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { blue, grey, indigo } from '@mui/material/colors';
import SendIcon from '@mui/icons-material/Send';

const ColorButton = styled(Button)<ButtonProps>(() => ({
    color: grey[50],
    backgroundColor: blue[900],
    '&:hover': {
      backgroundColor: indigo[900],
    },
  }));

  interface ButtonProp {
    onclick: () => void;
  }

  

function ButtonHome({onclick} : ButtonProp){
    return(
        <ColorButton endIcon={<SendIcon />} sx={{ width: '7rem', height: '3rem'}} onClick={() => onclick() }>Enviar</ColorButton>
    )
}

export default ButtonHome;