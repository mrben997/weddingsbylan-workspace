'use client'
import React, { useRef, useEffect, useState } from 'react';

interface ShadowDomProps {
    children?: string;
}

const ShadowDom: React.FC<ShadowDomProps> = ({ children }) => {
    const shadowRef = useRef<HTMLDivElement | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient && shadowRef.current) {
            const shadowRoot = shadowRef.current.attachShadow({ mode: 'open' });
            shadowRoot.innerHTML = `<link rel="stylesheet" href="/public/css/ckeditor5.css"><div class="ck-content">${children}</div>`
        }
    }, [children, isClient]);

    return (
        <>
            <div style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                margin: '-1px',
                padding: 0,
                border: 0,
                opacity: 0,
            }} dangerouslySetInnerHTML={{ __html: children ?? "" }}></div>
            <div ref={shadowRef} />
        </>
    );
};

export default ShadowDom;
