import {UsuarioStoreProvider, UsuarioStore} from '../stores/usuarios/UsuarioStore';
import { useContext, useEffect, useState } from 'react';
import './usuarios.css';
import {IUsuario} from '../stores/usuarios/UsuarioIData';
import ojoAbierto from '../assets/ojo-abierto.png';
import ojoCerrado from '../assets/ojo-cerrado.png';
import Info from '../commons/Info';

const Usuarios = () => {
    return(
        <UsuarioStoreProvider>
            <UsuariosComp/>
        </UsuarioStoreProvider>
    )
}

const UsuariosComp = () => {
    const url = 'http://localhost:8080/';
    const {usuarioState, dispatch, user} = useContext(UsuarioStore)
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        usuarioState.usuarios.length === 0 && getUsuariosData()
    }, [])

    const getUsuariosData = async () => {
        await fetch(url+'usuarios').then((res) => {
            if(res.ok){
                res.json().then((data) => {
                    if(data){
                        setUsuarios(data)
                        return dispatch({
                            type: 'GET',
                            payload: data
                        })
                    }
                })
            }
        })
    }

    const putUser = async ( user: any) => {
        await fetch(url+'usuarios',{
            method:'PUT',
            body: JSON.stringify(user)
        }).then((res) => {
            if(res.ok){
                getUsuariosData()
            }
        })
    }

    const deleteUser = async ( alias: any) => {
        await fetch(url+'/usuarios',{
            method:'DELETE',
            body: JSON.stringify(alias)
        }).then((res) => {
            if(res.ok){
                getUsuariosData()
            }
        })
    }

    const Usuario = (_: any) => {
        const oldAlias = _.value.alias
        const [alias, setAlias] = useState(_.value.alias)
        const [admin, setAdmin] = useState(_.value.admin == 1)
        const [info, setInfo] = useState('')
        const [modal, setModal] = useState(false)
        const[modalAction, setModalAction] = useState<() => void> (() =>{});
        const [logOut, setLogOut] = useState(false)
        return(
            <>
                <input className='alias-input' type= 'text' value={alias} onChange={(e) => {
                    setAlias(e.target.value)
                }}/>
                <input className='toggle' type='checkbox' checked= {admin} onClick={(e) => {
                    setAdmin(!admin)
                }}
                onChange={() => {
                    setAdmin(!admin)
                }}/>
                <button className='delete-btn' title='Eliminar usuario' onClick={() => {
                    setModal(true)
                    setInfo('¿Está seguro de que desea eliminar al usuario?')
                    setLogOut(user.alias == alias)
                    setModalAction(() => () => {
                        deleteUser({alias: alias})
                    })
                }}>🗑️</button>
                <button className='edit-btn' onClick={() => {
                    setModal(true)
                    setInfo('¿Está seguro de que desea modificar al usuario?')
                    setLogOut(false)
                    setModalAction(() => () => {
                        putUser({oldAlias: oldAlias, alias: alias, clave: _.value.clave, admin: admin ? 1 : 0 })
                    })
                }}>✏️</button>
                <Info infoState={modal} info={info} show={setModal} action={modalAction} logOut={logOut}/>
            </>
        )
    }

    const UsuarioPropio = (_: any) => {
        const oldAlias = _.value.alias
        const [alias, setAlias] = useState(_.value.alias)
        const [clave, setClave]= useState(_.value.clave)
        const [showPass, setShowPass] = useState(false)
        const [info, setInfo] = useState('')
        const [modal, setModal] = useState (false)
        const [modalAction, setModalAction] = useState<() => void> (() => {});
        const [logOut, setLogOut] = useState(false)
        return (
            <>
                <input className='alias-input' type='text' value={alias} onChange={(e) => {
                    setAlias(e.target.value)
                }}/>

                <div className='password-container'>
                    <input className='password-input' type={showPass ? 'text' : 'password'} value={clave} onChange={(e) => {
                        setClave(e.target.value)
                    }}/>
                    <button 
                    type='button'
                    className='toggle-password'
                    onClick={() => setShowPass(!showPass)}>
                        {showPass ? <img className='pass-img' src= {ojoAbierto} alt="ver"/> : <img className='pass-img' src={ojoCerrado} alt="No ver"/>}
                    </button>
                </div>
                <button className='delete-btn' title='Eliminar usuario' onClick={() => {
                    setModal(true)
                    setInfo('¿Está seguro de que desea eliminar el usuario?')
                    setModalAction(() => () => {
                        deleteUser({alias: alias})
                    })
                    setLogOut(true)
                }}>🗑️</button>
                <button className='edit-btn' title='Eliminar usuario' onClick={() => {
                    setModal(true)
                    setInfo('¿Está seguro de que desea modificar el usuario?')
                    setLogOut(false)
                    setModalAction(() => () => {
                        putUser({oldAlias: oldAlias, alias: alias, clave: clave, admin: _.value.admin})
                    })
                }}>✏️</button>
                <Info infoState={modal} info= {info} show={setModal} action={modalAction} logOut={logOut}/>
            </>
        )
     }

     const usuario = usuarios.length > 0 ? usuarios.find((it: IUsuario) => {
        if(it.id === user.id)
            return it
     }) : user
     return(<>
         {user && <> 
            <div className='section'>
                <p className='user-title'>Panel de usuario</p>
            </div>
            <div className='spacer'/>
            <p className='user-title'>Mis datos</p>
            <div className='user-grid'>
                <div className='grid-header'>Alias</div>
                <div className='grid-header'> Clave</div>
                <div className='grid-header'>Eliminar</div>
                <div className='grid-header'>Editar</div>
                <UsuarioPropio value={usuario} key={usuario.id}/>
            </div>
            {user.admin &&
            <> 
            <div className='spacer'/>
            <p className='user-title'> Panel de administración</p>
            <div className='user-grid'>
                <div className='grid-header'>Alias</div>
                <div className='grid-header'>Admin</div>
                <div className='grid-header'>Eliminar</div>
                <div className='grid-header'>Editar</div>
                {usuarios.map((user: IUsuario) => {
                    return(
                        <Usuario value={user} key={user.id}/>
                    )
                })}
            </div>
            </>}
         </>}
     </>
     )
}

export default Usuarios;