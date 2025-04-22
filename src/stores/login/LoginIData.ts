export interface ILogin{
    id: number,
    alias: string,
    clave: string,
    admin: boolean,
    loged: boolean
}

export interface ILoginAction{
    type: string,
    payload: ILogin
}