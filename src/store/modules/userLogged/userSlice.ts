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
    excluirLogado(state) {
      return initialState;
    },
    atualizarRecado(state, action : PayloadAction<Recado> ) {
      const indexRec = state.recados.findIndex((e) => e.id === action.payload.id);

      if(indexRec === -1 ) {
        return state
      }

      const recadoAtualizado = [...state.recados]
      recadoAtualizado[indexRec] = action.payload;
        
      return {...state, recados: recadoAtualizado}
    },
}});

export const { cadastrarRecado, excluirRecado, atualizarLogged, excluirLogado, atualizarRecado } = userLog.actions;
export const userLogged = userLog.reducer;