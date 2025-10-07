import { SxProps, Theme } from '@mui/material'

export const HttpRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/

export const Sleep = (sec: number) => new Promise((res) => setTimeout(res, sec))

export const KeyExtractor = (item: any, index: number) => 'key' + index
export type Dictionary<T> = Record<string, T>
export const FetchDelay = async function <TModel>(action: () => Promise<TModel>, sec: number) {
  const [res] = await Promise.all([action(), Sleep(sec)])
  return res
}

export const IsValidEmail = (value: string) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(value)
}

export const IsValidPhoneNumber = (phoneNumber?: string): boolean => {
  // Biểu thức chính quy để kiểm tra số điện thoại
  const phoneRegex = /^(\+?\d{1,4}[\s-]?)?((\(\d{1,4}\))|\d{1,4})[\s-]?\d{1,4}[\s-]?\d{1,9}$/
  return phoneRegex.test((phoneNumber ?? '').trim())
}

export const IsValidRegexURL = (url: string): boolean => {
  const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
  return regex.test(url)
}

export const LinksToString = (value?: string[]) => value?.join('\n') ?? ''

export const ParseStringArray = (value?: any): string[] => {
  try {
    if (Array.isArray(value)) return value
    const pValue = JSON.parse(value ?? '')
    if (Array.isArray(pValue)) return pValue
    return []
  } catch (error) {
    return []
  }
}

export const LinkArrayByString = (value: string = '') => {
  const updatedText = value.split('http').join(' http')
  return (
    updatedText
      .match(/[hH][tT][tT][pP][sS]?:\/\/[^\s]+/g)
      ?.filter((x) => x)
      .map((x) => x.trim()) ?? []
  )
}

interface ILinkAddSingleParams {
  links: string[]
  newLinks: string[]
  maxLink: number
}
export const LinkAddSingle = (params: ILinkAddSingleParams): string[] => {
  const linkSet = new Set([...params.newLinks, ...params.links].filter((e) => !!e))
  return Array.from(linkSet)
}

export const IsValidUrl = (value: string): boolean => {
  try {
    new URL(value)
    return true
  } catch (err) {
    return false
  }
}

export const IsValidLink = (value: string = '') => {
  const valueFormated = value.trim()
  return IsValidRegexURL(valueFormated) && IsValidUrl(valueFormated)
}

export const IsDuplicatedLink = (linkOrigins: string = '', value: string = '') => {
  const linkSet = new Set(LinkArrayByString(linkOrigins))
  const valueFormated = value.trim()
  return linkSet.has(valueFormated)
}

interface IValidAllParams {
  linkOrigins: string
  value: string
  maxLink: number
}
export const IsValidAll = (params: IValidAllParams) => {
  const valueFormated = params.value.trim()
  const check1 = !IsDuplicatedLink(params.linkOrigins, valueFormated) && IsValidLink(valueFormated)
  const check2 = LinkArrayByString(params.linkOrigins).length <= params.maxLink
  return check1 && check2
}

export const StringToColor = (string: string) => {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

export const StringAvatar = (name: string = 'A', sx?: SxProps<Theme>) => {
  return {
    sx: { bgcolor: StringToColor(name), ...sx },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
  }
}

/**
 * Simple object check.
 * @param item
 * @returns {boolean}
 */
export const IsObject = (obj: any) => {
  return obj && typeof obj === 'object' && !Array.isArray(obj)
}

type DeepPartial<T> = { [P in keyof T]?: T[P] extends Record<string, any> ? DeepPartial<T[P]> : T[P] } | undefined

export const MergeObjects = <T extends Record<string, any>>(...objects: DeepPartial<T>[]): T => {
  return objects.reduce((prev, obj) => {
    if (!obj || typeof obj === 'string') return prev
    Object.keys(obj).forEach((key) => {
      if (IsObject((prev as any)[key]) && IsObject((obj as any)[key])) {
        ;(prev as any)[key] = MergeObjects((prev as any)[key], (obj as any)[key])
      } else {
        ;(prev as any)[key] = (obj as any)[key]
      }
    })
    return prev
  }, {} as T) as any
}

type AnyObject = { [key: string]: any }
const ObjectAssign = <T extends AnyObject>(model: T, ...sources: (Partial<T> | undefined)[]) => {
  if (sources.length < 1) {
    return model
  }
  const temps = sources.filter((x) => x) as T[]
  return temps.reduce((a, b) => {
    a = Object.assign(a, b)
    return a
  }, model)
}

export const DeepMerge = <T extends AnyObject>(model: T, ...sources: (Partial<T> | undefined)[]) => {
  sources = sources.filter((x) => !!x)
  if (sources.length < 1) {
    return model
  }
  const temps = [model, ...sources].filter((x) => x)
  const fieldObjects = temps.reduce<string[]>((a, b) => {
    if (!b) return a
    const fields = Object.keys(b).filter((x) => typeof b[x] === 'object' && !Array.isArray(b[x]))
    a.push(...fields)
    return a
  }, [])

  const target = ObjectAssign<T>(model, ...temps.slice(1))
  const temp = target as any
  const temp2 = temps.slice(1).filter((x) => !!x) as Partial<T>[]
  for (let index = 0; index < fieldObjects.length; index++) {
    const element = fieldObjects[index]
    temp[element] = DeepMerge({}, temp[element], ...temp2.map((x) => x[element]))
  }
  return target
}

// Easing function for smooth scroll effect
const EaseInOutQuad = (t: number, b: number, c: number, d: number) => {
  t /= d / 2
  if (t < 1) return (c / 2) * t * t + b
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
}

export const ScrollToBottom = (element: HTMLDivElement, duration: number) => {
  const start = element.scrollTop
  const end = element.scrollHeight
  const change = end - start
  const increment = 20 // Time in milliseconds between each step

  let currentTime = 0

  const animateScroll = () => {
    currentTime += increment
    const val = EaseInOutQuad(currentTime, start, change, duration)
    element.scrollTop = val
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll)
    }
  }
  animateScroll()
}

export const WindowScrollToTop = (options?: ScrollToOptions) => {
  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth', ...options })
  }, 50)
}

export const WindowScrollToTopById = (elementId: string, options?: ScrollToOptions & { scrollMore: number }) => {
  setTimeout(() => {
    const element = document.getElementById(elementId)
    if (element) {
      const rect = element.getBoundingClientRect()
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const top = rect.top + scrollTop + (options?.scrollMore ?? 0)
      window.scrollTo({ top, behavior: 'smooth', ...options })
    } else {
      console.warn(`Element with ID ${elementId} not found`)
    }
  }, 50)
}

export const NumberOfDaysUpToNow = (value?: string, defaultValue?: number): number => {
  if (!value) return defaultValue ?? 0
  const date = new Date(value)
  const now = new Date()
  if (now > date) return 0
  const amout = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  return amout
}

export const FormatTiming = (num?: number) => {
  if (!num || num === 0) return '00:00:00'
  const hours = Math.floor(num / 3600)
  const minutes = Math.floor((num % 3600) / 60)
  const seconds = num % 60

  const formattedHours = String(hours).padStart(2, '0')
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(seconds.toFixed(0)).padStart(2, '0')

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
}

export const FormatDatetime = (value?: string) => {
  if (!value) return 'No time'
  const dt = new Date(value)
  const date = String(dt.getDate()).padStart(2, '0')
  const month = String(dt.getMonth()).padStart(2, '0')
  const year = dt.getFullYear()
  return `${month}-${date}-${year}`
}

export const FormatFileSize = (sizeInKb: number) => {
  if (sizeInKb < 1024) {
    return sizeInKb.toFixed(2) + ' Kb'
  } else if (sizeInKb < 1024 * 1024) {
    return (sizeInKb / 1024).toFixed(2) + ' Mb'
  } else if (sizeInKb < 1024 * 1024 * 1024) {
    return (sizeInKb / (1024 * 1024)).toFixed(2) + ' Gb'
  } else {
    return (sizeInKb / (1024 * 1024 * 1024)).toFixed(2) + ' Tb'
  }
}

export const GetImageUrl = (resourceId: string) => {
  return '/api/v1/guest/Upload/VideoThumb/' + resourceId
}

export const FormatterUSD = (value: number) => {
  const numberFormat = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })
  return numberFormat.format(value).replace('$', '$ ')
}

export const FormatterVN = (value: number) => {
  const numberFormat = Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  })
  return numberFormat.format(value).replace('$', '') + ' vnđ'
}

export const AreObjectsEqual = (obj1: any, obj2: any) => {
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false
  }
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)
  if (keys1.length !== keys2.length) return false
  for (let key of keys1) {
    if (!keys2.includes(key)) return false
  }
  for (let key of keys1) {
    if (obj1[key] !== obj2[key]) return false
  }
  return true
}

export const EncodeBase64 = (input: string): string => {
  try {
    const utf8Bytes = new TextEncoder().encode(input)
    let binaryString = ''
    utf8Bytes.forEach((byte) => {
      binaryString += String.fromCharCode(byte)
    })
    return btoa(binaryString)
  } catch (error) {
    console.error('Error encoding to base64', error)
    return ''
  }
}

export const DecodeBase64 = (encoded: string): string | undefined => {
  try {
    const binaryString = atob(encoded)
    const utf8Bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      utf8Bytes[i] = binaryString.charCodeAt(i)
    }
    return new TextDecoder().decode(utf8Bytes)
  } catch (error) {
    console.error('Error decoding base64', error)
    return
  }
}

export const TryParseJson = function <T>(value: any, defaultValue?: any): Partial<T> {
  try {
    return JSON.parse(value) ?? {}
  } catch (error) {
    console.log(error)
    return defaultValue || {}
  }
}

export const TryParseArray = function <T>(value: any, defaultValue: T[] = []): T[] {
  try {
    if (!value) return []
    const parseValue = JSON.parse(value)
    return Array.isArray(parseValue) ? parseValue : []
  } catch (error) {
    return defaultValue
  }
}

export const TryParseInt = function (value: any, defaultValue?: number): number | undefined {
  try {
    if (!value) return defaultValue
    return parseInt(value)
  } catch (error) {
    return defaultValue
  }
}

export const tryParseObject = function <T>(value: any, defaultValue: T): T {
  try {
    if (!value) return defaultValue
    return JSON.parse(value)
  } catch (error) {
    console.log(error)
    return defaultValue
  }
}

export const CapitalizeFirstText = (value: string = '') => {
  if (!value) return value
  const [first, ...data] = Array.from(value)
  return `${first.toUpperCase()}${data.join('')}`
}

export const ConvertDictToArray = <T>(data: Dictionary<T>) => {
  return Object.values(data) as T[]
}

export const ConvertArrayToDict = <T>(arr: T[], selectId: (x: T) => any): Dictionary<T> => {
  return arr.reduce<Dictionary<T>>((a, b) => {
    a[selectId(b)] = b
    return a
  }, {})
}
