import { colors } from '@mui/material'
import { IAttachItem, IAttachItemConfigs, IAttachItemStatus } from './types'

export const allowImageTypes = ['image/jpeg', 'image/png', 'image/svg+xml']

export const allowPdfTypes = ['application/pdf']

export const allowFileTypes = [...allowImageTypes]//, ...allowPdfTypes]

export const isValidFileType = (value?: string) => allowFileTypes.some((e) => e === value)

export const isImageFile = (value?: string) => allowImageTypes.some((e) => e === value)

export const isPdfFile = (value?: string) => allowPdfTypes.some((e) => e === value)

export const mapItemConfigs: IAttachItemConfigs = {
  old: { color: colors.grey[500], label: 'Current', count: 0 },
  new: { color: colors.green[500], label: 'New', count: 0 },
  deleted: { color: colors.red[500], label: 'Delete', count: 0 }
}

export const tryParseArray = function <T>(value: any, defaultValue: T[] = []): T[] {
  try {
    if (!value) return []
    const parseValue = JSON.parse(value)
    return Array.isArray(parseValue) ? parseValue : []
  } catch {
    return defaultValue
  }
}

export const getAttachQuality = (items: IAttachItem[]) => {
  return items.reduce<Record<IAttachItemStatus, number>>(
    (acc, item) => {
      const status = item.status || 'old'
      acc[status] = (acc[status] || 0) + 1
      return acc
    },
    { old: 0, new: 0, deleted: 0 }
  )
}

export const toEnglishSlug = (str: string): string => {
  const temp = str
    .normalize('NFD') // split Vietnamese accents
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-zA-Z0-9\s]/g, '') // remove special characters
    .replace(/\s+/g, ' ') // replace multiple spaces with a single space
    .trim() // remove leading/trailing spaces
    .replace(/\s/g, '-') // replace spaces with hyphens
    .toLowerCase()
  return temp + '-' + new Date().getTime().toString(36) // append timestamp to ensure uniqueness
}

export const isBlobUrl = (url: string) => url.startsWith('blob:')

export const fileToAttachItem = (file: File, options?: Partial<IAttachItem>): IAttachItem => ({
  id: toEnglishSlug(file.name),
  name: file.name,
  type: isImageFile(file.type) ? 'image' : isPdfFile(file.type) ? 'pdf' : 'unknown',
  thumbnail: isPdfFile(file.type) ? 'images/pdf-default.webp' : URL.createObjectURL(file),
  file,
  ...options
})

export const checkEqualQuality = (items1: IAttachItem[], items2: IAttachItem[]): boolean => {
  const quality = getAttachQuality(items1)
  const qualityCache = getAttachQuality(items2)
  return JSON.stringify(quality) !== JSON.stringify(qualityCache)
}

// // Upload new items and return updated items with url, skip items if upload fails or returns empty
// export const fetchUploadNewFiles = async (items: IAttachItem[], fetchUpload?: AttachUploadFunction): Promise<IAttachItem[]> => {
//   if (!fetchUpload) return items

//   const updated: IAttachItem[] = []
//   for (const item of items) {
//     if (item.status === 'new' && item.file) {
//       try {
//         const result = await fetchUpload(item)
//         if (result && result.url) {
//           const thumb = result.thumbnail ?? item.thumbnail ?? ''
//           updated.push({ ...item, url: result.url, thumbnail: !isBlobUrl(thumb) ? thumb : '', status: 'old' })
//         }
//         // If result is empty or no url, skip this item
//       } catch {
//         // If upload fails, skip this item
//       }
//     } else {
//       updated.push(item)
//     }
//   }
//   return updated
// }
