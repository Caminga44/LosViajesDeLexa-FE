import React, { useContext }  from "react";
import './Info.css'
import { Link } from "react-router-dom";
import { UserStore } from "../stores/login/LoginStore";

interface InfoProps {
    infoState: boolean;
    info: string;
    show: (value: boolean) => void;
    action?: () => void;
    logOut?: boolean;
}

const Info: React.FC<InfoProps> = ({ infoState, info, show, action, logOut }) => {
    
    const { state, dispatch } = useContext(UserStore);
    const clearUser = () => {
        return dispatch({
            type: 'OUT',
            payload: { name: '', password: '', admin: false, loged: false }
        })
    }
    return (
        <>
            {infoState &&
                <div className="overlay">
                    <div className="error-container">
                        <button className= 'error-close' onClick={(e) => {
                            e.preventDefault()
                            show(false)}}>X</button>
                        <h2 className="error-text">{info}</h2>
                        { logOut ?
                            <Link to='/'>
                                <button className="error-confirm" onClick={(e) => {
                                    clearUser()
                                    action?.()
                                    show(false)}}>OK</button>
                            </Link>
                            :
                            <button className="error-confirm" onClick={(e) => {
                                e.preventDefault()
                                action?.()
                                show(false)}}>OK</button>
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Info;