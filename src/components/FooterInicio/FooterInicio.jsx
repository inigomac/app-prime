import './FooterInicio.css'


export const FooterInicio = () => {

    // Este componente guarda el footer del inicio

    return(
        <div className='div_inc'>
            <img className='inc_img' src="/public/assets/logo_header.png" alt="logo de amazon prime" loading='lazy' />
            <ul className='inc_ul'>
                <li className='inc_li'>Términos y Aviso de privacidad</li>
                <li className='inc_li'>Envíanos tus comentarios</li>
                <li className='inc_li'>Ayuda</li>
                <li className='inc_li'>Aviso sobre cookies</li>
                <li className='inc_li copy'>©1996-2024, Amazon.com, Inc. o sus filiales</li>
            </ul>
        </div>
    )
}