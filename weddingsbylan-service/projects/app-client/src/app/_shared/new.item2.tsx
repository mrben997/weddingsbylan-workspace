import { INews } from '@/admin-react-app/model';
import ShadowDom from '@/shared/components/shadow.dom';
import { getDayMonth, GetImageUrl, getPageUrl, ImageType } from '@/shared/helper';
import React from 'react';
import TooltipWrap from './tooltip.wrap';
import { LangLink2 } from '@/shared/components/LangLink2';

interface INewItemProps {
    data: INews
    col?: number
    ImageType: ImageType
}

export default function NewItem(p: INewItemProps) {
    return (
        <>
            <div className={"news-block-one col-md-" + (p.col ?? 6)} >
                <div className="inner-box">
                    <div className="news-content d-flex">
                        <div className="image pb-10 line">
                            <img
                                src={GetImageUrl(p.ImageType, p.data.ImageUrl)}
                                alt=""
                                style={{
                                    width: "100%",
                                    objectFit: "cover"
                                }}
                            />
                            <div className="overlay">
                                <LangLink2 className="link-btn" href={getPageUrl(p.ImageType, p.data.Locale) + p.data.KeyName}>
                                    <i className="fa fa-link" />
                                </LangLink2>
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <LangLink2 href={getPageUrl(p.ImageType, p.data.Locale) + p.data.KeyName}>
                                <h4 className='text-truncate' data-toggle="tooltip" data-placement="bottom" title={p.data.Name}>{p.data.Name} </h4>
                            </LangLink2>
                            <TooltipWrap className="text truncate-2-lines" data-toggle="tooltip" data-html="true" data-placement="bottom" title={p.data.Description} >
                                <ShadowDom>
                                    {p.data.Description}
                                </ShadowDom>
                            </TooltipWrap>
                            {/* <div className="date" style={{ background: '#fafafa', border: '1px soilid #e0e0e0' }}>{getDayMonth(p.data.dateCreated, p.data.Locale)}</div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
