export interface IUser{
    alias: string;
    clave: string;
    admin: boolean;
    loged: boolean;
}

export interface IUserAction{
    type: string,
    payload: IUser,
}