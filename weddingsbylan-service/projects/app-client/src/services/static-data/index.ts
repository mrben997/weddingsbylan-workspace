import { ILanguage } from '@/locales/types'
import dataJson from './data'
import { IDataStatic } from './types'
class StaticDataService {
    private readonly _data: IDataStatic
    /**
     *
     */
    constructor(data: IDataStatic) {
        this._data = data
    }

    GetServices = () => {
        return Promise.resolve(this._data.ServiceList ?? [])
    }
    GetBlogs = () => {
        return Promise.resolve(this._data.Blogs ?? [])
    }
    GetHeaderMenu = (language: ILanguage) => {
        const menus = [...this._data.HeaderMenus]
        menus.forEach(x => {
            const locale = language["Locale"] as string
            x.Name = language[x.Key] as string
            const data = (x.Hrefs ?? {}) as Record<string, string>
            x.Href = data[locale] as string
        })
        return Promise.resolve(menus)
    }

    GetHomepageFluid = () => {
        return Promise.resolve(this._data.HomePageFluid ?? []);
    }

    GetHomepageOurTeam = () => {
        return Promise.resolve(this._data.HomePageOurTeam ?? []);
    }

    GetHomepageBlogs = () => {
        return Promise.resolve(this._data.HomePageBlogs ?? []);
    }

    GetNews = () => {
        return Promise.resolve(this._data.News ?? []);
    }
}

export const StaticData = new StaticDataService(dataJson)