import React, { FC, useState } from 'react';
interface IIframeBlockProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
}
const IframeBlock = React.forwardRef<HTMLIFrameElement, IIframeBlockProps>(({ onLoad, style, ...props }: IIframeBlockProps, ref) => {
    const [loading, setLoading] = useState(true);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
            {loading && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Nền mờ
                        zIndex: 1,
                    }}
                >
                    <p>Loading...</p>
                </div>
            )}
            <iframe
                ref={ref}
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    ...(style ?? {})
                }}
                onLoad={() => setLoading(false)} // Khi iframe load xong
                {...props}
            />
        </div>
    );
})
export default IframeBlock