import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recado } from '../typeStore';


const initialState : string = ''

const inputDetail = createSlice({
  name: 'detailSlice',
  initialState,
  reducers: {

    mudarValueDet(state, action : PayloadAction<string> ) {
        state = action.payload
        return state
    },
    editarRecadoDet(state, action : PayloadAction<Recado> ) {
      return state = action.payload.detail
    },
    clearInputDet(state){
      return state = ''
    }
  },
});

export const { mudarValueDet, editarRecadoDet, clearInputDet } = inputDetail.actions;
export const inputDetalhe = inputDetail.reducer;