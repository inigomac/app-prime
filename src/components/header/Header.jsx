import { useState, useEffect, useRef } from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom'
import logoHeader from './../../../public/assets/logo_header.png';
import logoPerfil from './../../../public/assets/adult-1.png';


export const HeaderMain = () => {

    // Este componente guarda la cabecera
    // @Hook {setHeaders} guardo la informacion de las categorias del header
    // @Hook {setMostrar} guardo un valor booleano que lo utilizo posteriormente para mostrar una subcategoria del header cuando es true
    // @Hook {navigate} me dirijo hacia la url /gestor cuando hago click en .header_button
    // @Hook {UseEffect} Hace una llamada al fetch

    // Vbls de entorno
    const {VITE_API} = import.meta.env
    // Hooks
    const [header, setHeaders] = useState([])
    const [mostrar, setMostrar] = useState(false)
    const navigate = useNavigate()
    // Custom hooks
    const toggleMostrar = () => {
        // @Hooks {setMostrar , Mostrar}
        // Este hook sirve para cuando haga click sobre .header_menu, convierta en true el setMostrar
        setMostrar(!mostrar)
    }
    const navegaGestor = () => {
        // @Hooks {Navigate}
        // Este hook sirve para guardar un valor booleano que lo utilizo posteriormente para mostrar una subcategoria del header cuando es true
        navigate('/gestor')
    }
    const getHeaders = async () => {

        // @Hooks {setHeaders}
        // Hace una llamada a la API
        // @param {string} URL a la que se realizará la solicitud GET
        // @returns {object} devuelve un string de categorias y subcategorias para el header


        let controller = new AbortController()
        let options = {
            method: 'get',
            signal: controller.signal
        }
        await fetch(`${VITE_API}/header`, options)
            .then(res => res.json())
            .then(data => setHeaders(data))
            .catch(err => console.log(err))
            .finally( () => controller.abort() )
    }
    // UseEffects
    useEffect(() => {
        getHeaders()
    }, [])

    return (
        <div className='header'>
            <nav className='header_nav'>                
                <button onClick={toggleMostrar} className='header_menu'>Menu</button>
                <img className='header_logo' src={logoHeader} alt="Logotipo de prime" loading='lazy' />
                <div className={`header_categorias ${mostrar ? 'mostrar' : ''}`}>
                    {header.length == 0 && <p>No hay header</p>}
                    {header.length != 0 && header.map(eachHeader =>
                        <Header key={eachHeader._id} {...eachHeader} />
                    )}
                </div>
                <button className='header_perfil' onClick={navegaGestor}>
                    <img src={logoPerfil} alt="perfil" />
                </button>
            </nav>
        </div>
    )
}





export const Header = (props) => {
    // Este componente guarda la cabecera
    // @Hook {setActiveHeader} guardo un valor booleano que depende la funcion que quiera ejecutar lo convierto en true. Por defecto es false

    // Hooks
    const [isActiveHe, setActiveHeader] = useState(false)
    // Custom Hooks
    const toggleActive = () => {
        // @Hooks {setActiveHeader , isActiveHe}
        // Quiero que me devuelva el valor contrario al que esta actualmente setActiveHeader que por defecto es false
        setActiveHeader(!isActiveHe)
    }
    // Props
    const { categorias, subcategorias } = props

    return (
        <ul className='nav_ul' onMouseEnter={toggleActive} onMouseLeave={toggleActive}>
            <li className='li_cat'>{categorias}</li>
            <div className={`ul_div ${isActiveHe ? 'isActive' : ''}`}>
                <ul className='div_ul'>
                    {subcategorias.length != 0 && subcategorias.map(sub =>
                        (<li className='li_sub' key={sub.id}>{sub.nombre}</li>)
                    )}
                </ul>
            </div>
        </ul>
    )
}