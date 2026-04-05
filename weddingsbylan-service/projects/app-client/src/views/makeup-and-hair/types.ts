export interface ISlide {
  img: string
  title: string
  subtitle: string
  desc?: string
  button: string
}

export interface IPlan {
  title: string
  price?: string
  per?: string
  features: string
  key?: 'basic' | 'section'
  ribbon?: {
    text: string
    type: 'popular' | 'new'
  }
  variant?: 'expert' | 'supreme'
}

export interface INote {
  id: number
  title: string
  text: string
}

export interface IMakeupAndHairConfigs {
  title: string
  description: string
  image: string
  alt: string
  url: string
}
