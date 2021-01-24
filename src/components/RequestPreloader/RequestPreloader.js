import React from 'react';
import './RequestPreloader.css';

function RequestPreloader({active}) {
    return (
        <section className={active ? "request-preloader request-preloader_opened" : "request-preloader"}>
            <i className="request-preloader__circle"></i>
        </section>
    );
}

export default RequestPreloader;