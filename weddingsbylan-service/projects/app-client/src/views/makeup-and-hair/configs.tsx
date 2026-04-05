import { INote, IPlan, ISlide } from './types'

export const defaultSlides: ISlide[] = [
  {
    img: 'https://fleur.qodeinteractive.com/wp-content/uploads/2017/01/h1-slide-1-background.jpg',
    title: 'STYLE & GRACE',
    subtitle: 'Make your beautiful website with Fleur',
    button: 'Purchase'
  },
  {
    img: 'https://fleur.qodeinteractive.com/wp-content/uploads/2017/01/h1-slide-4-background.jpg',
    title: 'THIS IS BEAUTY',
    subtitle: 'Designed with love & care, Fleur is all you ever wanted',
    desc: 'Duis sed odio sit amet nibh vulputate cursus a sit amet mauris. Morbi accumsan ipsum velit. Nam nec tellus a odio tincidunt auctor elit. Duis sed odio sit amet nibh',
    button: 'Purchase'
  },
  {
    img: 'https://fleur.qodeinteractive.com/wp-content/uploads/2017/01/h1-slide-3-background.jpg',
    title: 'MODERN ELEGANCE',
    subtitle: 'Perfect layouts for your portfolio and shop',
    button: 'Purchase'
  }
]

export const defaultServices: IPlan[] = [
  { title: 'BUSINESS', price: '$39', per: 'per month', features: '10 projects, 100 users' },
  {
    title: 'EXPERT',
    price: '$59',
    per: 'per month',
    features: '20 projects, 200 users',
    ribbon: { text: 'POPULAR', type: 'popular' },
    variant: 'expert'
  },
  {
    title: 'SUPREME',
    price: '$79',
    per: 'per month',
    features: '15 projects, 150 users',
    ribbon: { text: 'NEW', type: 'new' },
    variant: 'supreme'
  }
]

export const defaultNotes: INote[] = [
  { id: 1, title: 'Introduction', text: 'Nullam ac justo efficitur, tristique ligula a, pellentesque ipsum.' },
  { id: 2, title: 'Preparation', text: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.' },
  { id: 3, title: 'Execution', text: 'Praesent laoreet sapien sit amet massa ornare, in pretium ex elementum.' },
  { id: 4, title: 'Summary', text: 'Curabitur nec arcu nec nulla scelerisque condimentum.' }
]
