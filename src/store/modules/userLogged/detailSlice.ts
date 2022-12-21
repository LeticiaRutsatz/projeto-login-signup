import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const initialState : string = ''

const inputDetail = createSlice({
  name: 'detailSlice',
  initialState,
  reducers: {

    mudarValueDet(state, action : PayloadAction<string> ) {
        state = action.payload
        return state
    },
    clearValueDet(state) {
         state = '';
    },
    
  },
});

export const { mudarValueDet, clearValueDet } = inputDetail.actions;
export const inputDetalhe = inputDetail.reducer;