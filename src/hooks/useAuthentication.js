import {createContext, useContext} from 'react';

export const AuthContext = createContext();

export function useAuthentication() {
  return useContext(AuthContext);
}
