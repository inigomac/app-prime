import { useContext, useState } from 'react'
import './Gestor.css'
import { useEffect } from 'react'
import { useRef } from 'react'
import { UsuarioContext } from '../../context/context'
import { FooterInicio } from '../../components/FooterInicio/FooterInicio'
import { Navigate, useNavigate } from 'react-router-dom'
import { Login } from '../login/Login'

// Gestor.jsx
// Hooks:
// - useState , UseContext , useEffect , UseRef , useNavigate
// Datos:
// - API fetch a https://localhost:3000/gestor
// - API fetch a https://localhost:3000/gestor/id/:id
// Estructura:
// - div_gestor (Contiene toda los perfiles o usuarios)
// - footer (FooterInicio)

export const Gestor = () => {
    // vbls de entorno
    const { VITE_API } = import.meta.env
    // Hooks
    const [usuarios, setUsuarios] = useState([])
    const [isActive, setActive] = useState(false)
    const [isVisible, setVisible] = useState(false)
    const formulario = useRef()
    const actuSubmit = useRef()
    const navigate = useNavigate()
    useEffect(() => {
        
        let login = JSON.parse(localStorage.getItem('usuario'))
        console.log(login)

        if (!login) {
            navigate('/login')
        }

        pedirUsuarios()
    }, [])
    useEffect(() => {
        document.body.classList.add('negro-body');
    }, [])
    // Custom Hooks
    const HandleActive = () => {
        // Este custom Hook sirve para establecer el valor de setActive que por defecto es false en el valor contrario
        setActive(!isActive)
    }
    const HandleVisible = () => {
        // Este custom Hook sirve para establecer el valor de setVisible que por defecto es false en el valor contrario
        setVisible(!isVisible)
    }
    const pedirUsuarios = async () => {
        // @Hooks {setUsuarios}
        // Hace una llamada a la API
        // @param {string} http://localhost:3000/gestor a la que se realizará la solicitud GET
        // @returns {object} devuelve un objeto con los usuarios
        let controller = new AbortController()
        let options = {
            method: 'get',
            signal: controller.signal
        }
        await fetch(`${VITE_API}/gestor`, options)
            .then(res => res.json())
            .then(data => setUsuarios(data))
            .catch(err => console.log(err.message))
            .finally(() => controller.abort())
    }
    const postUsuarios = async (e) => {
        // @Hooks {setUsuarios}
        // Hace una llamada a la API
        // @param {string} http://localhost:3000/gestor a la que se realizará la solicitud POST
        // @returns {object} enviamos un objeto con dos propiedades
        e.preventDefault()
        const [username, pass] = formulario.current

        const nuevo = {
            username: username.value,
            pass: pass.value
        }

        let controller = new AbortController()
        let options = {
            method: 'post',
            signal: controller.signal,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevo)
        }
        await fetch(`${VITE_API}/gestor`, options)
            .then(res => res.json())
            .then(data => setUsuarios(data))
            .catch(err => console.log(err.message))
            .finally(() => controller.abort())
    }
    const putUsuarioBtn = async (_id) => {
        // @Hooks {setUsuarios}
        // Hace una llamada a la API
        // @param {string} http://localhost:3000/gestor a la que se realizará la solicitud PUT
        // @returns {object} enviamos un objeto con dos propiedades
        const buscar = usuarios.find(usuario => usuario._id === _id)

        const { current: form } = actuSubmit

        form['id'].value = buscar._id,
            form['username'].value = buscar.username,
            form['pass'].value = buscar.pass


    }
    const putUsuario = async (e) => {
        // @Hooks {setUsuarios}
        // Hace una llamada a la API
        // @param {string} http://localhost:3000/gestor a la que se realizará la solicitud PUT
        // @returns {object} enviamos un objeto con dos propiedades
        e.preventDefault()

        const { current: form } = actuSubmit

        const actualizar = {
            id: form['id'].value,
            username: form['username'].value,
            pass: form['pass'].value,
        }
        let controller = new AbortController()
        let options = {
            method: 'put',
            signal: controller.signal,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(actualizar)
        }
        await fetch(`${VITE_API}/gestor`, options)
            .then(res => res.json())
            .then(data => setUsuarios(data))
            .catch(err => console.log(err.message))
            .finally(() => controller.abort())
    }
    const deleteUsuario = async (_id) => {
        // @Hooks {setUsuarios}
        // Hace una llamada a la API
        // @param {string} http://localhost:3000/gestor a la que se realizará la solicitud DELETE
        // @returns {object} enviamos a traves de la url el id que queremos eliminar de la base de datos
        let controller = new AbortController()
        let options = {
            method: 'delete',
            signal: controller.signal
        }
        fetch(`${VITE_API}/gestor/id/${_id}`, options)
            .then(res => res.json())
            .then(data => setUsuarios(data))
            .catch(err => console.log(err.message))
            .finally(() => controller.abort())
    }
    const cerrarSesion = () => {
        localStorage.removeItem('usuario')
        navigate('/login')
    }


    return (
        <UsuarioContext.Provider value={{ putUsuarioBtn, deleteUsuario, HandleVisible }}>
            <div className='div_gestor'>
                <h2 className='gestor_h2'>¿Quién está viendo?</h2>
                <div className='gestor_users'>
                    {usuarios.length === 0 && <p>No hay usuarios</p>}
                    {usuarios.length != 0 && usuarios.map(usuario =>
                        <User key={usuario._id} {...usuario} />
                    )}
                </div>
                <button className='gestor_add' onClick={HandleActive}>Añadir</button>
                <button className='gestor_add cerrar' onClick={cerrarSesion}>Cerrar sesion</button>
                <div className={`gestor_añade ${isActive ? 'isActive' : ''}`}>
                    <button className='añade_close' onClick={HandleActive}>Cerrar</button>
                    <h2 className='añade_h2'>Añadir usuario y contraseña</h2>
                    <form className='añade_form' onSubmit={postUsuarios} ref={formulario}>
                        <input className='añade_input' type="text" name="username" placeholder='Usuario' />
                        <input className='añade_input' type="password" name="pass" placeholder='Pass' />
                        <input className='añade_btn' type="submit" value="Enviar" />
                    </form>
                </div>
                <div className={`gestor_modificar ${isVisible ? 'isVisible' : ''}`}>
                    <button className='modificar_close' onClick={HandleVisible}>Cerrar</button>
                    <h2 className='modificar_h2'>Modificar usuario y contraseña</h2>
                    <form className='modificar_form' onSubmit={putUsuario} ref={actuSubmit}>
                        <input className='modificar_input' type="hidden" name="id" placeholder='id' />
                        <input className='modificar_input' type="text" name="username" placeholder='Nombre de usuario' />
                        <input className='modificar_input' type="password" name="pass" placeholder='Contraseña' />
                        <input className='modificar_btn' type="submit" value="Actualizar" />
                    </form>
                </div>
            </div>
            <FooterInicio />
        </UsuarioContext.Provider>

    )
}

const User = (props) => {
    // En este componente se pinta toda la informacion de cada usuario y tambien se pasa como props las funciones
    // @params {string} username , _id
    // @Hooks {useContext} putUsuarioBtn, deleteAlumno, HandleVisible
    
    const { putUsuarioBtn, deleteUsuario, HandleVisible } = useContext((UsuarioContext))
    const { username, _id } = props

    return (
        <div className='users_div'>
            <img className='users_img' src="/assets/adult-1.png" alt="Una imagen" />
            <p className='users_nombre'>{username}</p>
            <button className='users_btn' onClick={() => { putUsuarioBtn(_id); HandleVisible() }}>Actualizar</button>
            <button className='users_btn' onClick={() => deleteUsuario(_id)}>Eliminar</button>
        </div>
    )
}
