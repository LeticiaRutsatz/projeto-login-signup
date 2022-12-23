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
        return state = action.payload.description
    },
    clearInputDesc(state){
      return state = ''
    }
  },
});

export const { mudarValueDesc, editarRecadoDes, clearInputDesc} = inputDesc.actions;
export const inputDescricao = inputDesc.reducer;