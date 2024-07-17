import './Inicio.css'
import { HeaderMain } from "../../components/header/Header"
import { useEffect, useState } from 'react'
import { Titulo } from '../../components/titulos/Titulos'
import { Catalogo } from '../../components/Catálogo/Catalogo'
import { FooterInicio } from '../../components/FooterInicio/FooterInicio'
// Inicio.jsx
// Hooks:
// - useState , UseEffect
// Datos:
// - API fetch a https://localhost:3000/lightbox
// Estructura:
// - Header de la web (HeaderMain)
// - Carrousel de fotos primero (Carrousel)
// - Cards que se expanden (CarsExpansibles2)
// - Footer (FooterInicio)
    // - CardPrimera 
    // - CardSegunda 
    // - CardTercera 
    // - CardCuarta 
export const Inicio = () => {

    return (
        <>
            <HeaderMain />
            <Carrousel />
            <CardsExpansibles2 />
            <Catalogo />
            <FooterInicio />
        </>
    )
}


const Carrousel = () => {
    // Este componente carga el carrousel de fotos primero
    // @Hook {setImagenes} Guardo todas las imagenes que quiero utilizar
    // @Props {String} imgprincipal , imgtitulo , edad
    // @Hook {UseEffect} Hace una llamada al fecth
    // @Hook {UseEffect} le añadimos solo a este body del documento esa clase para que tenga un fondo oscuro
    // @Hook {setFoto} guardo el indice de las fotos

    // Vbl de entorno
    const { VITE_API } = import.meta.env
    // Hooks
    const [imagenes, setImagenes] = useState([])
    useEffect(() => {
        getImagenes()
    }, [])
    useEffect(() => {
        document.body.classList.add('black-body');
    }, [])
    const [foto, setFoto] = useState(0)
    // Custom Hooks
    const getImagenes = async () => {
        // @Hooks {setImagenes}
        // Hace una llamada a la API
        // @param {string} http://localhost:3000/lightbox a la que se realizará la solicitud GET
        // @returns {object} devuelve un objeto con varias propiedades de cada imagen
        let controller = new AbortController()
        let options = {
            method: 'get',
            signal: controller.signal
        }
        await fetch(`${VITE_API}/lightbox`, options)
            .then(res => res.json())
            .then(data => setImagenes(data))
            .catch(err => console.log(err))
    }
    const siguiente = () => {
        // Hook personalizado UseState
        // @hooks {setFoto}
        // Este hook sirve para pasar a la siguiente foto y si el indice de la foto es mayor al total de las fotos - 1, entonces vuelve a la primera foto

        setFoto(foto + 1)

        if (foto >= imagenes.length - 1) {
            setFoto(0)
        }
    }
    const atras = () => {
        // Hook personalizado UseState
        // @hooks {setFoto}
        // Este hook sirve para pasar a la siguiente foto y si el indice de las fotos es inferior a 0, entonces vuelve a la primera foto
        setFoto(foto - 1)

        if (foto <= 0) {
            setFoto(imagenes.length - 1)
        }
    }
    const irFoto = (id) => {
        // Hook personalizado UseState
        // @hooks {setFoto}
        // Este hook sirve para pasar ir directamente a la foto seleccionada mediante su indice
        setFoto(id)
    }

    return (
        <div className="carousel">
            <div className="carrousel_container" style={{ transform: `translateX(-${foto * (100 / imagenes.length)}%)`, width: `${imagenes.length * 100}%` }}>
                {imagenes.map(img =>
                    <Img key={img.id} {...img} />
                )}
            </div>
            <button className="carrousel_arrow next" onClick={siguiente}>
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
                </svg>
            </button>
            <button className="carrousel_arrow prev" onClick={atras}>
                <svg className='arrow_prev' xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="white" viewBox="0 0 16 16">
                    <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
                </svg>
            </button>
            <ul className="carrousel_ul">
                {imagenes.map(img =>
                    <li className="carrousel_li" key={img.id} >
                        <button className="carrousel_btn" onClick={() => irFoto(img.id)}></button>
                    </li>
                )}
            </ul>
        </div>
    )
}

const Img = (props) => {

    // Este componente carga toda la informacion de la solicitud a la API
    // @params {String} imgprincipal, imgtitulo, edad

    const { imgprincipal, imgtitulo, edad } = props

    return (
        <div className='imagenes_div'>
            <img src={imgprincipal} alt="Una imagen" className="carrousel_img" loading='lazy' />
            <InfoLightbox imgtitulo={imgtitulo} edad={edad} />
        </div>
    )
}

const InfoLightbox = (props) => {

    // Este componente carga toda la informacion necesaria de la API que va dentro de cada imagen (es informacion de cada pelicula)
    // @params {String} imgtitulo, edad

    const { imgtitulo, edad } = props

    return (
        <div className='container_div'>
            <img className='lig_img' src={imgtitulo} alt="Titulo de la pelicula" loading='lazy' />
            <div className='lig_info'>
                <p className='lig_p'>Ver con un periodo de prueba de 7 días gratis de Prime, se renueva automáticamente por 6,99 €/mes</p>
                <span className='lig_edad'>{edad}</span>
            </div>
            <div className='lig_div'>
                <a className='btn_info' href="#">Mas informacion</a>
                <svg className='btn_svg' xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>
            </div>
        </div>
    )
}

const CardsExpansibles2 = () => {
    // Este componente carga directamente las cards expansibles que hacen esas animaciones directamente con css (no depende de la API)
    return (
        <>
            <Titulo />
            <div className='container_card'>
                <CardPrimera />
                <CardSegunda />
                <CardTercera />
                <CardCuarta />
            </div>
        </>
    )
}

const CardPrimera = () => {
    // Contenido de la primera card expansible
    return(
        <div className='card primera'>
                    <div className='card_img primera'>
                        <div className='panel'>
                            <h2 className='panel_h2 merce'></h2>
                            <div className='panel_btn'>
                                <span className='btn_span play'>
                                    <svg className='span_play' xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                                    </svg>
                                </span>
                                <span className='span_rpr'>Reproducir</span>
                                <span className='btn_span plus'>
                                    <svg className='span_plus' xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                    </svg>
                                </span>
                                <span className='btn_span info'>
                                    <svg className='span_info' xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                    </svg>
                                </span>
                            </div>
                            <div className='panel_info'>
                                <div className='div_svg'>
                                    <svg className='svg_tick' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                    </svg>
                                </div>
                                <span className='info_span'>Se incluyte en prime</span>
                                <span className='info_span edad'>+13</span>
                            </div>
                        </div>
                    </div>
                </div>
    )
}
const CardSegunda = () => {
    // Contenido de la segunda card expansible
    return(
        <div className='card segunda'>
                    <div className='card_img segunda'>
                        <div className='panel'>
                            <h2 className='panel_h2 anato'></h2>
                            <div className='panel_btn'>
                                <span className='btn_span play'>
                                    <svg className='span_play' xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                                    </svg>
                                </span>
                                <span className='span_rpr'>Reproducir</span>
                                <span className='btn_span plus'>
                                    <svg className='span_plus' xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                    </svg>
                                </span>
                                <span className='btn_span info'>
                                    <svg className='span_info' xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                    </svg>
                                </span>
                            </div>
                            <div className='panel_info'>
                                <div className='div_svg'>
                                    <svg className='svg_tick' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                    </svg>
                                </div>
                                <span className='info_span'>Se incluyte en prime</span>
                                <span className='info_span edad'>+13</span>
                            </div>
                        </div>
                    </div>
                </div>
    )
}
const CardTercera = () => {
    // Contenido de la tercera card expansible
    return(
        <div className='card tercera'>
                    <div className='card_img tercera'>
                        <div className='panel'>
                            <h2 className='panel_h2 fede'></h2>
                            <div className='panel_btn'>
                                <span className='btn_span play'>
                                    <svg className='span_play' xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                                    </svg>
                                </span>
                                <span className='span_rpr'>Reproducir</span>
                                <span className='btn_span plus'>
                                    <svg className='span_plus' xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                    </svg>
                                </span>
                                <span className='btn_span info'>
                                    <svg className='span_info' xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                    </svg>
                                </span>
                            </div>
                            <div className='panel_info'>
                                <div className='div_svg'>
                                    <svg className='svg_tick' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                    </svg>
                                </div>
                                <span className='info_span'>Se incluyte en prime</span>
                                <span className='info_span edad'>+13</span>
                            </div>
                        </div>
                    </div>
                </div>
    )
}
const CardCuarta = () => {
    // Contenido de la cuarta card expansible
    return(
        <div className='card cuarta'>
                    <div className='card_img cuarta'>
                        <div className='panel'>
                            <h2 className='panel_h2 land'></h2>
                            <div className='panel_btn'>
                                <span className='btn_span play'>
                                    <svg className='span_play' xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
                                    </svg>
                                </span>
                                <span className='span_rpr'>Reproducir</span>
                                <span className='btn_span plus'>
                                    <svg className='span_plus' xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                    </svg>
                                </span>
                                <span className='btn_span info'>
                                    <svg className='span_info' xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                    </svg>
                                </span>
                            </div>
                            <div className='panel_info'>
                                <div className='div_svg'>
                                    <svg className='svg_tick' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="" viewBox="0 0 16 16">
                                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                    </svg>
                                </div>
                                <span className='info_span'>Se incluyte en prime</span>
                                <span className='info_span edad'>+13</span>
                            </div>
                        </div>
                    </div>
                </div>
    )
}