import { IPageBanner } from '@/admin-react-app/pages/settings/setting.form.types';
import { getEditModeKey } from '@/shared/components/edit.mode';
import { GetImageUrl } from '@/shared/helper';
import React, { HTMLAttributes } from 'react';
import './banner-section.css'
interface IBannerSectionProps extends HTMLAttributes<HTMLElement> {
    data?: IPageBanner[] | null
}
export default function BannerSection({ style, data, ...props }: IBannerSectionProps) {
    return (
        <section
            className="page-title"
            {...getEditModeKey("PageBanner")}
            style={{ ...(style || {}), backgroundImage: `url(${GetImageUrl("Settings", data?.[0]?.ImageUrl)})`, userSelect: 'none' }} // Anh nen chinh
            {...props}
        />
    );
}
