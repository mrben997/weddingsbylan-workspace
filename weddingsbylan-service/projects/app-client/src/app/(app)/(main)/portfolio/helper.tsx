import { INews } from '@/admin-react-app/model'
import { GetImageUrl } from '@/shared/helper'
import { IPortfolioItem } from '@/views/portfolio'

export const mapPortfolioItems = (items: INews[] | null): IPortfolioItem[] => {
  if (!items) return []
  return items.map<IPortfolioItem>((item, idx) => ({
    id: item.Id || idx,
    src: GetImageUrl('News', item.ImageUrl) ?? '',
    title: item.Name,
    desc: item.Content,
    category: item.Tags || ''
  }))
}
