export interface IUsuarios{
    usuarios: IUsuario[]
}

export interface IUsuario{
    id: number,
    alias: string,
    clave: string,
    admin: number
}

export interface IUsuarioAction{
    type: string,
    payload: IUsuarios
}