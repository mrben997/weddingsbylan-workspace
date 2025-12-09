'use server'
import React from 'react'
import { INews } from '@/admin-react-app/model'
import { newsService } from '@/services/news.servce'
import { convertDetails, GetImageUrl } from '@/shared/helper'
import { IAttachItem } from '@/modules/LibraryLab/attach-widget/types'
import type { IPortfolioItem } from '@/views/portfolio-detail/configs'
import PortfolioDetailView from '@/views/portfolio-detail'

interface PageProps {
  params: { id: string; locale?: string }
}

const mapNewsToPortfolioItems = (news: INews | null): IPortfolioItem[] => {
  if (!news) return []

  const attachments = convertDetails(news.Description || '') as IAttachItem[]

  const items: IPortfolioItem[] = attachments
    .map((att) => {
      const url = GetImageUrl('News', att.url) || att.url || att.name || ''
      return {
        src: url,
        alt: att.id || att.name || news.Name || 'portfolio image',
        title: news.Name || att.name || '',
        description: news.Content || news.Description || '',
        category: news.Tags || ''
      } as IPortfolioItem
    })
    .filter((it) => it.src && it.src.length > 0)

  return items
}

const PortfolioDetailPage = async ({ params }: PageProps) => {
  const { id } = params

  let item: INews | null = null
  try {
    item = await newsService.Get(`${id}`)
  } catch (e) {
    console.error('Failed to fetch portfolio item', e)
  }

  const items = mapNewsToPortfolioItems(item)

  return <PortfolioDetailView items={items} />
}

export default PortfolioDetailPage
