export interface Recado {
    id: string;
    description: string;
    detail: string;
    changeIcon: number;
  }
  
  export interface User {
    name: string;
    email: string;
    password: string;
    recados: Recado[];
  }
  

  export type Users = User[];
  export type UserLogged = User;