import { combineReducers } from 'redux';
import buttonEnviar from './buttonEnviar';
import { inputDescricao } from './userLogged/descricaoSlice';
import { inputDetalhe } from './userLogged/detailSlice';
import { userLogged } from './userLogged/userSlice';
import { listaUsuarios } from './users/usersSlice';

const rootReducer = combineReducers({
  users: listaUsuarios,
  userLogged: userLogged,
  inputDesc: inputDescricao,
  inputDetail: inputDetalhe,
  buttonEnviar : buttonEnviar,
});

export type RootState = ReturnType<typeof rootReducer>
export { rootReducer };