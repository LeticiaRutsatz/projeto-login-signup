import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recado, User} from '../typeStore';

const initialState : User = {name: '', email: '', password:'', recados : []}

const userLog = createSlice({
  name: 'userLogged',
  initialState,
  reducers: {
    atualizarLogged(state, action : PayloadAction<User>) {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.recados = action.payload.recados;
    },
    cadastrarRecado(state, action : PayloadAction<Recado>) {
        return {
            ...state, recados: [...state.recados, action.payload]
       }
    },
    excluirRecado(state, action : PayloadAction<number> ) {
      state.recados.splice(action.payload, 1);
      return state;
    },
    editarRecado(state, action : PayloadAction<number> ) {
      state.recados[action.payload].description = 'n sei'
      state.recados[action.payload].detail = 'n sei'

      return {...state, recados: [...state.recados]}
    }
  },
});

export const { cadastrarRecado, excluirRecado, atualizarLogged, editarRecado } = userLog.actions;
export const userLogged = userLog.reducer;