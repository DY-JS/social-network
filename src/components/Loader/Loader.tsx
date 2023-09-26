import React from 'react';
import loaderSVG from  '../../assets/loader.svg'
import s from './Loader.module.css'

const Loader = () => {
    return (
        <div className={s.loader}>
                <img className={s.img} src={loaderSVG} alt="Loader" /> {/* Use an <img> element to display the SVG */}
        </div>
    );
};

export default Loader;