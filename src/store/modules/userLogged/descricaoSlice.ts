import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recado } from '../typeStore';


const initialState : string = ''

const inputDesc = createSlice({
  name: 'descricaoSlice',
  initialState,
  reducers: {

    mudarValueDesc(state, action : PayloadAction<string> ) {
      state = action.payload
      return state
    },
    editarRecadoDes(state, action : PayloadAction<Recado> ) {
        
    }
  },
});

export const { mudarValueDesc, editarRecadoDes} = inputDesc.actions;
export const inputDescricao = inputDesc.reducer;