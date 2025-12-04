import React from 'react'
import Footer from '@/views/global/footer'
import { newsService } from '@/services/news.servce'
import { IAttachItem } from '@/modules/LibraryLab/attach-widget/types'
import { INews } from '@/admin-react-app/model'
import PortfolioDetail, { IItemDetail } from './portfolio-detail'
import { convertDetails, GetImageUrl } from '@/shared/helper'


interface PageProps {
  params: { id: string; locale?: string }
}

const PortfolioDetailPage = async ({ params }: PageProps) => {
  const { id } = params

  // Try to fetch the item by id from the news service
  let item: INews | null = null
  try {
    // newsService.Get expects a url like `/${id}` to fetch a single item
    // It will return the item's data or throw if not found
    item = await newsService.Get(`${id}`)
  } catch (e) {
    // keep item null on error
    console.error('Failed to fetch portfolio item', e)
  }

  const details = convertDetails(item?.Description).map<IItemDetail>((x) => ({ src: GetImageUrl('News', x.url) ?? '', alt: x.id }))

  return <PortfolioDetail details={details.filter((x) => x.src !== '')} />

  // return (
  //   <div className='portfolio-detail-area'>
  //     <div className='portfolio-detail-header' style={{ backgroundImage: "url('/images/banner-1.jpg')" }}>
  //       <h1 className='typography-h1'>PORTFOLIO PINTEREST</h1>
  //       <div className='typography-body1'>let your business grow trough this stunning theme</div>
  //     </div>
  //     <div className='portfolio-gallery'>
  //       <div className='masonry-grid'>
  //         {details.map((img, idx) => (
  //           <div className='masonry-item' key={idx}>
  //             <img src={img.url} alt={img.id} loading='lazy' />
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // )
}

export default PortfolioDetailPage
