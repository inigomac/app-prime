import { useState, useEffect, useRef } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import logo from './../../../public/assets/logo.png';

// Login.jsx
// Hooks:
// - useState , UseEffect , useRef , UseNavigate
// Datos:
// - API fetch a https://localhost:3000/login
// Estructura:
// - Login
// - MensajeError
// - IniciarSesion
// - Footer

export const Login = () => {
    // Vbls de entorno
    const {VITE_API} = import.meta.env
    // Hooks
    const formulario = useRef();
    const navigate = useNavigate();
    const [login, setLogin] = useState();
    useEffect(() => {
        if (login === true) {
            navigate('/inicio');
        } else {
            <MensajeError />
        }
    }, [login, navigate]);
    useEffect(() => {
        let iniciorapido = JSON.parse(localStorage.getItem('usuario'))
        if (iniciorapido) {
            navigate('/inicio')
        }
    } , [])
    // Custom Hooks
    const postLogin = async (event) => {
        // @Hooks {setLogin}
        // Hace una llamada a la API
        // @param {string} http://localhost:3000/login a la que se realizará la solicitud POST
        // @returns {object} devuelve un valor booleano que puede ser true o false despues de comprobar si el nuevo objecto enviado coincide con el de la base de datos
        event.preventDefault();
        const { current: form } = formulario; 
        const nuevo = {
            username: form['username'].value,
            pass: form['pass'].value
        };
        let controller = new AbortController();
        let options = {
            method: 'post',
            signal: controller.signal,
            body: JSON.stringify(nuevo),
            headers: { 
                "Content-type": "application/json"
            }
        };
        await fetch(`${VITE_API}/login`, options)
        .then(res => res.json())
        .then(data => {
            setLogin(data.login);
            if (data.login === true ) {
                localStorage.setItem('usuario' , JSON.stringify({login:true}))
            }else {    
                form.reset();
            }
            })
        .catch(err => console.log(err));
    };

    return (
        <div className='login'>
            <img className='login_pct' src={logo} alt="Una imagen" loading='lazy' /> 
            <IniciarSesion postLogin={postLogin} formulario={formulario} login={login} />    
            <Footer />
        </div>
    );
}

const MensajeError = () => {
     // Este componente carga el error que tiene que mostrarse cuando el login es incorrecto
    return (
        <ul className='error_ul'>
            <li className='error_title'>Ha surgido un problema</li>
            <li className='error_li'>No encontramos ninguna cuenta con esa dirección de correo electrónico</li>
        </ul>
    )   
}
const IniciarSesion = (props) => {
    // Este componente carga la el formulario donde el usuario tiene que introducir sus datos de inicio de sesion
    // @Props {String} postLogin , formulairo , login
    const {postLogin , formulario , login } = props
     
    return(
        <div className='login_div'>
                {login === false && <MensajeError />}
                <form className='div_form' ref={formulario} onSubmit={postLogin}>
                    <h2 className='form_h2'>Iniciar sesion</h2>
                    <div className='form_usuario'>
                        <p className='usuario_p'>Dirección de email o número de telefono</p>
                        <input className='usuario_input' type="text" name='username' placeholder='Usuario' />
                    </div>
                    <div className='form_contraseña'>
                        <p className='contraseña_p'>Contraseña</p>
                        <input className='contraseña_input' type="password" name='pass' placeholder='Contraseña' />
                    </div>                    
                    <input className='form_btn' type="submit" value="Iniciar sesión" />
                    <p className='form_terminos'>Al continuar, aceptas las <a href="https://www.primevideo.com/help/ref=av_auth_te?nodeId=202064890" title='Condiciones de uso'>Condiciones de uso</a> de Amazon. Consulta <a href="https://www.primevideo.com/help/ref=av_auth_pv?nodeId=202064890" title='Aviso de seguridad'>Aviso de privacidad, Aviso de cookies y Anuncios por intereses.</a></p>
                    <a className='form_ayuda' href="#" title='Necesitas ayuda?'>¿Necesitas ayuda?</a>
                </form>
                <div className='div_nuevo'>
                    <p className='nuevo_p'>¿Eres nuevo en Amazon?</p>
                    <a className='nuevo_a' href="#" title='Crea tu cuenta de amazon'>Crea tu cuenta de Amazon</a>
                </div>
        </div>
    )
}
const Footer = () => {
    // Este componente carga el footer de la web
    // @Props {String} postLogin , formulario , login
    return(
        <div className='lfooter_div'>
            <ul className='lfooter_ul'>
                <li className='lfooter_li' >Términos y Aviso de privacidad</li>
                <li className='lfooter_li' >Envíanos tus comentarios</li>
                <li className='lfooter_li' >Ayuda</li>
            </ul>
            <p className='lfooter_p'>© 1996-2024, Amazon.com, Inc. o sus afiliados</p>
        </div>
    )
}
