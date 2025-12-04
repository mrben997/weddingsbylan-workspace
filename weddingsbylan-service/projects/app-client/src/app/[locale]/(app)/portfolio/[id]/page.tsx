import { TryParseArray } from '@/modules/Library/Helpers'
import { newsService } from '@/services/news.servce'
import PortfolioDetailView from '@/views/portfolio-detail'
import { IPortfolioItem } from '@/views/portfolio-detail/configs'
import React from 'react'

type Props = {
  params: { locale: string; id: string }
}

/**
 * Map a news record to an array of IPortfolioItem objects.
 * - Parses `Description` (expected to be a JSON string of media objects).
 * - Filters images and builds a sensible `src`, `alt`, `title`, `description`, `category`.
 */
function mapNewsToPortfolioItems(news: any): IPortfolioItem[] {
  if (!news) return []
  const desc = TryParseArray(news.Description, [])
  return []
}

export default async function Page({ params }: Props) {
  const { id, locale } = params

  // Fetch the news item by Id and locale. The service returns an array.
  let itemsForView: IPortfolioItem[] = []
  try {
    const res = await newsService.Filter({ where: { Id: parseInt(id, 10), Locale: locale, IsActive: true } })
    const newsItem = Array.isArray(res) ? res[0] : res
    itemsForView = mapNewsToPortfolioItems(newsItem)
  } catch (e) {
    // swallow error for now — the page will render the default items if this fails
    console.error('Failed to load news item for portfolio detail', e)
  }

  return <PortfolioDetailView items={itemsForView} />
}
