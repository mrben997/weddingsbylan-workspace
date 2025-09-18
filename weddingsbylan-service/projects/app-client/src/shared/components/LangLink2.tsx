'use client'
import React, { FC, useEffect, useState } from 'react';
import { addLocaleToHref, fixHashPosition } from './helper';
import { TLanguage } from '@/locales/types';
import { getLocale } from '@/admin-react-app/ultilities/helper';
interface ILangLinkProps extends React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
}


export const LangLink2: FC<ILangLinkProps> = (props) => {
    const locale = getLocale()
    const { href, ...other } = props
    let [sHref, setSHref] = useState(href)
    useEffect(() => {
        let newLink = href ? fixHashPosition(href) : '/';
        if (!newLink.startsWith('/')) {
            newLink = `/${newLink}`;
        }
        const prefix = locale ? `/${locale}` : '/vn';
        newLink = prefix + newLink;
        setSHref(href ? newLink : undefined)
    }, [])

    return (
        <a {...other} href={sHref} />
    );
}
