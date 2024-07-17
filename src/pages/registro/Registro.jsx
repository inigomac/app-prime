import { Footer } from '../../components/footer/Footer'
import { Header, HeaderMain } from '../../components/header/Header'
import './Registro.css'
import { Link } from 'react-router-dom';

// Registro.jsx
// Estructura:
// - Cabecera (HeaderMain)
// - Main (PrimerSection , SegundoSection)
// - Footer (Footer)


export const Registro = () => {



    return (
        <>
            <HeaderMain />
            <PrimerSection />
            <SegundoSection />
            <Footer />
        </>

    )
}

const PrimerSection = () => {
     // Este componente guarda la informacion de la primera seccion
    return (

        <div className='Registro_div'>
            <section className='div_section'>
                <h2 className='section_h2'>Ve películas y series</h2>
                <p className='section_p'>Disfruta de series Amazon Originals exclusivas, además de películas y series populares. Precio de lanzamiento de <s>€ 6,99</s> <b>€ 2,99</b>/mes durante los primeros seis meses. Cancela en cualquier momento.</p>
                <Link className='section_a' to="/login" title='Ir a la pagina login'>Comienza tu periodo de prueba gratuito</Link>
                <p className='section_sus'>La suscripcion se renueva por 6,99/mes</p>
            </section>
        </div>
    )
}
const SegundoSection = () => {
    // Este componente guarda la informacion de la segunda seccion

    return (
        <div className='Registro_divcolumn'>
            <section className='div_sectioncolumn'>
                <h2 className='section_h2'>Disfruta ahora, cancela en cualquier momento.</h2>
                <p className='section_p'>Suscríbete sin compromisos. Cancela tu suscripción de Amazon Prime Video en cualquier momento.</p>
                <Link className='section_a' to="/login" title='Ir a la pagina login'>Comienza tu periodo de prueba gratuito</Link>
            </section>
        </div>

    )
}