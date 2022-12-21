import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Users } from '../typeStore';

const initialState : Users = [];

const listaSlice = createSlice({
  name: 'listaUsuarios',
  initialState,
  reducers: {
    adicionar(state, action : PayloadAction<User>) {
      return [...state, action.payload]
    },
    logout(state, action : PayloadAction<User>) {
        const indexUser = state.findIndex((user) => user.email === action.payload.email)

        if(indexUser === -1 ) {
          return state
        }

        const listaAtualizada = [...state]
        listaAtualizada[indexUser] = action.payload;
        
        return listaAtualizada;
    },
  },
});

export const { adicionar, logout } = listaSlice.actions;
export const listaUsuarios = listaSlice.reducer;
