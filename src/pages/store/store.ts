import {configureStore} from '@reduxjs/toolkit';
import bancoUsuarios from './bancoUsuarios';

const store = configureStore({
  reducer: {
    banco: bancoUsuarios
  }
});

export type State = ReturnType<typeof store.getState>;
export default store;