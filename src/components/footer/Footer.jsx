
import React from 'react';
import foto_footer from './../../../public/assets/foto_footer.png';
import './Footer.css';

export const Footer = () => {
    // Este componente se utiliza en el footer de la pagina registro
    return (
        <div className='footer_div'>
            <img className='div_img' src={foto_footer} alt="Una foto" />
            <ul className='div_ulfooter'>
                <li className='ul_li'>Términos y Aviso de privacidad</li>
                <li className='ul_li'>Aviso de cookies</li>
                <li className='ul_li'>Envíanos tus comentarios</li>
                <li className='ul_li'>Ayuda</li>
            </ul>
            <p className='div_p'>© 1996-2024, Amazon.com, Inc. o sus filiales</p>
        </div>
    );
};
