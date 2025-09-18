import { ILanguage, TLanguage } from "@/locales/types"

/// Homepage
export interface IHomePage {
    Id: string
    Name: string
}

export interface IHomePageFluid {
    Id: string
    text: string,
    author: string,
    role: string
}

export interface IHomePageOurTeam {
    Id: string
    name: string,
    designation: string,
    image: string,
    description: string,
    social: {
        facebook: string,
        twitter: string,
        linkedin: string
    }
}

export interface IHomePageBlogs {
    Id: string
    title: string,
    author: string,
    comments: string,
    imageUrl: string,
    description: string,
    link: string
}

/////////

export interface IBlog {
    Id: string
    Name: string
}
export interface IMenu {
    Key: keyof ILanguage
    Name: string
    Href?: string
    Hrefs?: Record<TLanguage, string>
    children?: IMenu[]
}

/// main-data
export interface IDataStatic {
    HeaderMenus: IMenu[]
    ServiceList?: IService[]
    Blogs?: IBlog[]
    HomePageFluid?: IHomePageFluid[]
    HomePageOurTeam?: IHomePageOurTeam[]
    HomePageBlogs?: IHomePageBlogs[]
    News?: INews[]
}

// SERVICE
export interface IService {
    Id: string,
    icon: string,
    img: string,
    title: string,
    description: string
}

/// NEWS
export interface INews {
    Id: string,
    title: string,
    author: string,
    comments: number,
    image: string,
    date: string,
    content: string,
    link: string
}