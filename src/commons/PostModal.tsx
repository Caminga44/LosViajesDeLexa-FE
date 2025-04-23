import './Modal.css'
import React, { useState } from 'react'
import logo from '../assets/logos/Logo-LVDL.png'

interface ModalProps {
    modalState: boolean;
    methodText: string;
    show: (value: boolean) => void;
    method: (texto: string, ciudad:string, provincia: string, img: string) => void
  }
  
  
  const StepZero = ({ciudad, setCiudad, provincia, setProvincia, img, setImg, setStep}: any) => { 
    return ( <>
            <input className='modal-input' value={ciudad} onChange={(e) => {
                e.preventDefault()
                setCiudad(e.target.value)
            }} placeholder='Ciudad'/>
            <input className='modal-input' value={provincia} onChange={(e) => {
                e.preventDefault()
                setProvincia(e.target.value)
            }} placeholder='Provincia'/>
            <input className='modal-input' value={img} onChange={(e) => {
                e.preventDefault()
                setImg(e.target.value)
            }} placeholder='Imagen'/>
            <button className='modal-button' onClick={(e) => {
                e.preventDefault()
                setStep(1)
            }}>Siguiente</button>
        </>)
}
const StepOne = ({texto, setTexto, setStep, ciudad, provincia, img, show, method, modalState, methodText}: any) => {
    return ( <>
            <div>
                <textarea className='post-box' value={texto} onChange={(e) => {
                    e.preventDefault()
                    setTexto(e.target.value)
                }}/>
                <p className='char-count'>
                        {1000 - texto.length}/1000 caracteres restantes
                </p>
            </div>
            <div className='buttons-container'>
                <button className='post-button' type='button' onClick={(e) => {
                    e.preventDefault()
                    setStep(0)
                }}>Anterior</button>
                <button className='post-button' type='button' onClick={(e)=> {
                        e.preventDefault()
                        show(!modalState)
                        method(texto, ciudad, provincia, img)
                }}>{methodText}r</button>
            </div>
        </>
    )}
  
  const PostModal: React.FC<ModalProps> = ({ modalState, show, method: method, methodText: methodText }) => {
    const [texto, setTexto] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [provincia, setProvincia] = useState('')
    const [img, setImg] = useState('')
    const [step, setStep] = useState(0)
    return(
        <>{ modalState &&
            <div className='overlay'>
                <div className='container'>
                    <button className='modal-close' onClick={(e) => {
                        e.preventDefault()
                        show(!modalState)}}
                    >X</button>
                    <h2>{methodText} el nuevo post</h2>
                    <img className='modal-logo' src={logo} />
                    <form className='modal-form'>     
                    {step == 0 ? <StepZero ciudad={ciudad} setCiudad={setCiudad} provincia={provincia} setProvincia={setProvincia} img={img} setImg={setImg} setStep={setStep}/> 
                    : <StepOne texto={texto} setTexto={setTexto} setStep={setStep} ciudad={ciudad} provincia={provincia} img={img} show={show} method={method} modalState={modalState} methodText={methodText}/>}
                    </form>
                </div>
            </div>
  }
        </>
    )
}


export default PostModal;
