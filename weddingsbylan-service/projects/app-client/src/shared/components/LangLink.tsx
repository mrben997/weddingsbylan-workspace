import { TLanguage } from '@/locales/types';
import React, { FC } from 'react';
import { addLocaleToHref, fixHashPosition } from './helper';
interface ILangLinkProps extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
    locale?: string
}
export const LangLink: FC<ILangLinkProps> = (props) => {
    let { href, locale, ...other } = props
    let newLink = href ? fixHashPosition(href) : '/';
    if (!newLink.startsWith('/')) {
        newLink = `/${newLink}`;
    }
    const prefix = locale ? `/${locale}` : '/vn';
    newLink = prefix + newLink;
    return (
        <a {...other} href={href ? newLink : undefined} />
    );
}
