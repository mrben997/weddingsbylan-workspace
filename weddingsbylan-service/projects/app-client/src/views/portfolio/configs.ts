export interface IPortfolioSlide {
  title: string
  subtitle?: string
  img: string
}

export const defaultPortfolioSlides: IPortfolioSlide[] = [
  {
    title: 'THE RIGHT ONE FOR YOU',
    subtitle: 'Find your perfect dress in our large collection',
    img: 'https://fleur.qodeinteractive.com/wp-content/uploads/2017/01/home-shop-sidebar-backround.jpg'
  },
  {
    title: 'NEVER STOP DREAMING',
    img: 'https://fleur.qodeinteractive.com/wp-content/uploads/2017/01/bridal-shop-slide-2-background.jpg'
  },
  {
    title: 'FOR YOUR PERFECT DAY',
    img: 'https://fleur.qodeinteractive.com/wp-content/uploads/2017/01/home-shop-sidebar-slide-2-backround.jpg'
  }
]

export const CategoryType = {
  all: 'all',
  wedding: 'wedding',
  engagement: 'engagement',
  family: 'family',
  hairAndMakeup: 'hairAndMakeup',
  maternity: 'maternity'
} as const

export type CategoryType = keyof typeof CategoryType

const mapCategoryToLabel: Record<CategoryType, string> = {
  [CategoryType.all]: 'All',
  [CategoryType.wedding]: 'Wedding',
  [CategoryType.engagement]: 'Engagement',
  [CategoryType.family]: 'Family',
  [CategoryType.hairAndMakeup]: 'Hair and Makeup',
  [CategoryType.maternity]: 'Maternity'
}

export const getCategoryLabel = (category: CategoryType): string => {
  return mapCategoryToLabel[category]
}

export const defaultCategories: string[] = Object.values(CategoryType).map((key) => getCategoryLabel(key))

export interface IPortfolioItem {
  src: string
  alt: string
  title: string
  description: string
  category: CategoryType
  href?: string
}

export const defaultPortfolioItems: IPortfolioItem[] = [
  {
    src: '/images/portfolio-0.jpg',
    alt: 'Portfolio Image 1',
    title: 'Wedding Photography',
    description: 'Capturing beautiful moments on your special day',
    category: CategoryType.wedding
  },
  {
    src: '/images/portfolio-1.jpg',
    alt: 'Portfolio Image 2',
    title: 'Couple Portrait',
    description: 'Romantic and elegant couple photography',
    category: CategoryType.engagement
  },
  {
    src: '/images/slide-0.jpg',
    alt: 'Portfolio Image 3',
    title: 'Wedding Ceremony',
    description: 'Professional ceremony photography',
    category: CategoryType.wedding
  },
  {
    src: '/images/slide-1.jpg',
    alt: 'Portfolio Image 4',
    title: 'Reception Moments',
    description: 'Joy and celebration captured perfectly',
    category: CategoryType.wedding
  },
  {
    src: '/images/slide-2.jpg',
    alt: 'Portfolio Image 5',
    title: 'Detail Shots',
    description: 'Beautiful wedding details and decorations',
    category: CategoryType.wedding
  },
  {
    src: '/images/gallery-0.jpg',
    alt: 'Portfolio Image 6',
    title: 'Bridal Portrait',
    description: 'Elegant bridal photography sessions',
    category: CategoryType.engagement
  },
  {
    src: '/images/gallery-1.jpg',
    alt: 'Portfolio Image 7',
    title: 'Wedding Party',
    description: 'Fun and creative group photography',
    category: CategoryType.family
  },
  {
    src: '/images/gallery-2.jpg',
    alt: 'Portfolio Image 8',
    title: 'Venue Shots',
    description: 'Stunning venue and location photography',
    category: CategoryType.wedding
  }
]
