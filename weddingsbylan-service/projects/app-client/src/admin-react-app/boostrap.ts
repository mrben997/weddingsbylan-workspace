import dynamic from 'next/dynamic';

export const AppRootNoSSR = dynamic(
    () => import('./App'),
    { ssr: false }
)