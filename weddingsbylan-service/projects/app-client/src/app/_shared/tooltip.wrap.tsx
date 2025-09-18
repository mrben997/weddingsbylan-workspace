'use client'
import React, { FC, HTMLAttributes, useEffect, useState } from 'react';
interface ITooltipWrapProps extends HTMLAttributes<HTMLDivElement> {

}
const TooltipWrap: FC<ITooltipWrapProps> = ({ title, ...props }) => {
    const [sTitle, setsTitle] = useState(title)
    useEffect(() => {
        if (title) {
            const div = document.createElement('div')
            div.innerHTML = title
            div.textContent && setsTitle(div.textContent)
        }
    }, []);
    return (
        <div title={sTitle} {...props} />
    );
}
export default TooltipWrap