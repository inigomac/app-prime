import { useEffect , useState } from 'react'
import './Catalogo.css'
import { Titulo } from '../titulos/Titulos'

export const Catalogo = () => {


    // Este componente se utiliza para renderizar todas las peliculas
    // @Hook {setPeliculas} se guarda la informacion de cada pelicula
    // @Hook {UseEffect} Hace una llamada al fetch
    
    // Vbl de entorno
    const {VITE_API} = import.meta.env
    // Hooks
    const [pelicula, setPelicula] = useState([])
    useEffect(() => {
        getPelis()
    }, [])
    // Custom Hooks
    const getPelis = async () => {

        // @Hooks {setPelicula}
        // Hace una llamada a la API
        // @param {string} URL a la que se realizará la solicitud GET
        // @returns {object} devuelve un array de peliculas

        let controller = new AbortController()
        let options = {
            method: 'get',
            signal: controller.signal
        }
        await fetch(`${VITE_API}/catalogo`, options)
            .then(res => res.json())
            .then(data => setPelicula(data))
            .catch(err => console.log(err))
            .finally(() => controller.abort())
    }
   
    return (
        <>
            <Titulo />
            <section className='catalogo'>
                {pelicula.length != 0 && pelicula.map(peli =>
                    <Pelicula key={peli.id} {...peli} />
                )}

            </section>
        </>
    )
}

const Pelicula = (props) => {

    // Este componente se utiliza para renderizar todas las peliculas
    // @Hook {setActive} se utiliza para controlar cuando esta activo o desactivado un efecto con hover a traves de un booleano que por defecto es false
    
    // Hooks
    const [isActive, setActive] = useState(false)
    // Custom Hooks
    const onActive = () => {
        setActive(true);
    }
    const offActive = () => {
        setActive(false);
    }

    const { anoEstreno, descripcion, duracion, edad, portada, titulo } = props

    return (
        <div className='div_catalogo' onMouseEnter={onActive} onMouseLeave={offActive}>
            <img className='catalogo_img' src={portada} alt="Una pelicula" loading='lazy' />
            <div className='catalogo_comprar'>
                <span className='svg_comprar'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4z" />
                </svg></span>
                <span className='catalogo_txt'>Comprar o alquiler</span>
                <CatalogoInfo isActive={isActive} anoEstreno={anoEstreno} descripcion={descripcion} duracion={duracion} edad={edad} titulo={titulo} />
            </div>        
        </div>
    )
}
const CatalogoInfo = (props) => {

    // Aqui se muestra la informacion de cada pelicula
      
    const { anoEstreno, descripcion, duracion, edad, portada, titulo , isActive , setActive } = props 

    return(
        <div className={`catalogo_info ${isActive ? 'isActive' : ''}`}>
                <BotonesCatalogo />
                <h3 className='info_titulo'>{titulo}</h3>
                <div className='info_div'>
                    <span className='span_txt año'>{anoEstreno}</span>
                    <span className='span_txt duracion'>{duracion}</span>
                    <span className='span_txt edd'>{edad}</span>
                </div>
                <p className='info_descr'>{descripcion}</p>
            </div>
    )
}
const BotonesCatalogo = () => {

    // Este componente contiene los controladores o botones de cada pelicula

    return (
        <div className='info_btn'>
            <div className='div_botones on'>
                <svg className='svg_btn' xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                </svg>
            </div>
            <span className='div_repro'>Reproducir</span>
            <div className='div_botones'>
                <svg className='svg_btn' xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"  viewBox="0 0 16 16">
                    <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                </svg>
            </div>
            <div className='div_botones'>
                <svg className='svg_btn' xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"  viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                </svg>
            </div>
        </div>
    )
}