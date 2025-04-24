import React, {useContext, useReducer} from 'react';
import {IUsuarios, IUsuarioAction} from './UsuarioIData';
import {useLogin} from '../login/LoginStore';


const initialState: IUsuarios = {
    usuarios: []
}
export const UsuarioStore = React.createContext<IUsuarios | any> (initialState)

function usuarioReducer(state: IUsuarios, action: IUsuarioAction): IUsuarios{
    switch(action.type){
        case 'GET': {
            return{...state, usuarios: action.payload.usuarios}
        }
        case 'DELETE': {
            return {...state, usuarios: action.payload.usuarios}
        }
        case 'PUT': {
            return {...state, usuarios: action.payload.usuarios}
        }
        default: return {...state}

    }
}

export const UsuarioStoreProvider = ({children}: any) =>{
    const [usuarioState, dispatch] = useReducer(usuarioReducer, initialState)
    const {state: loginState, dispatch: loginDispatch} = useLogin()

    return (
        <UsuarioStore.Provider value = {{usuarioState, dispatch, user: loginState, loginDispatch}}>
            {children}
        </UsuarioStore.Provider>
    )
}