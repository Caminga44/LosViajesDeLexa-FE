import React, {useContext, useReducer} from 'react';
import { ILogin, ILoginAction } from './LoginIData';

//Estado inicial de nuestro modelo de datos 
const initialState: ILogin = { 
    id: -1, //Como el id mínimo en una BBDD es 0 ponemos un valor imposible, como -1 para saber que la información está vacía
    alias: '',
    clave: '',
    admin: false,
    loged: false // Por defecto el estado inicial de un usuario será no estar logueado hasta que realice la acción de log-in
}

//Creación del store agregandole contexto y el estado incial 
export const UserStore = React.createContext <ILogin | any> (initialState) 

//Función propia para gestionar las distintas acciones que nos llegarán desde la parte de UI
//State: Reflejará el estado actualizado de nuestro modelo de datos 
//Action: Reflejará la acción realizada y la respuesta que nos llegue desde el backend en su parametro payload
function userReducer (state: ILogin, action: ILoginAction): ILogin{
    switch(action.type){
        case'LOGIN':{//Aquí registramos la acción de login por parte de la UI y le devolvemos el payload que llega desde backend
            return{id: action.payload.id, alias: action.payload.alias, clave: action.payload.clave, admin: action.payload.admin, loged:true}
        }
        case 'OUT': {//Aquí setteamos el state a vacío y false sin necesidad de llamar al backend. Es como si limpiasemos el store para no tener info del usuario
            return {id: -1, alias:'', clave: '', admin: false, loged: false}
        }
        case'REG': {//Aquí registramos la acción de registro de un usuario nuevo y le devolvemos el payload que llega desde backend ocultando la clave
            return{id: action.payload.id, alias: action.payload.alias, clave: '', admin: action.payload.admin, loged: true}
        }
        default: return {...state}
    }
}

//Función para exportar el estado de nuestro modelo a otros Stores que necesiten esta información 
export function useLogin() {
    return useContext(UserStore)
}

//Función para proveer el Store al completo (estado actualizado y el método con el que gestionamos las acciones) a los hijos que lo requieran mediante props.children
export function UserStoreProvider(props: any){
    const [state, dispatch] = useReducer(userReducer, initialState)
    return(<UserStore.Provider value={{state,dispatch}}>{props.children}</UserStore.Provider>)
}