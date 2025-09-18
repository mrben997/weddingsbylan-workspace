import { ILanguage, TLanguage } from "@/locales/types"
import headerMenues from '../asstes/headerMenues'
export const changeLaunguage = (locale: TLanguage) => {
    let pathname = location.pathname;
    let search = location.search;

    // Remove existing locale from path if present
    const segments = pathname.split('/').filter(segment => segment.length > 0);
    if (segments.length > 0 && (segments[0] === 'vn' || segments[0] === 'en')) {
        segments.shift(); // Remove first segment (existing locale)
    }

    // Add new locale to beginning of path
    const newPathname = '/' + locale + '/' + segments.join('/');

    // Remove locale from search parameters if present
    if (search) {
        const searches = search.slice(1).split("&").map(x => x.split("=")).filter(x => x[0] !== 'locale');
        search = searches.length > 0 ? "?" + searches.map(x => x[0] + "=" + x[1]).join("&") : "";
    }

    location.href = (newPathname + search).replace(/\/{2,}/g, '/'); // Remove any double slashes
}

export type ImageType = "News" | "Settings" | "Service" | "Recruitment"
export const GetImageUrl = (type: ImageType, path?: string) => {
    switch (type) {
        case "News":
            return `/api/images/news/${path}`
        case "Service":
            return `/api/images/services/${path}`
        case "Settings":
            return `/api/images/settings/${path}`
        case "Recruitment":
            return `/api/images/recruitments/${path}`
        default:
            break;
    }
}
const months = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
]

export const getDayMonth = (date: string | Date, locale?: TLanguage | string) => {
    const temp = new Date(date)
    const day = temp.getDate() < 10 ? "0" + temp.getDate() : temp.getDate().toString()
    const month = temp.getMonth()
    return locale === 'en' ? `${day}, ${months[month]}` : `${day}, Tháng ${month + 1}`
}

export const getPathMenuBare = (locale: TLanguage | string, key: keyof ILanguage) => {
    const path = getMenuPath(locale as TLanguage, key);
    return path?.replace(/[\/\\]/gi, ""); // Remove trailing slash if exists
}
export const getPageUrl = (ImageType: ImageType, locale: TLanguage | string) => {
    switch (ImageType) {
        case "News":
            return getPathMenuBare(locale, "Blog") + "/";
        case "Service":
            return getPathMenuBare(locale, "Service") + "/";
        case "Recruitment":
            return getPathMenuBare(locale, "Recruitment") + "/";
        default:
            throw new Error("ImageType not supported");
    }
}


export const getMenuPath = (locale: TLanguage, key: keyof ILanguage) => {
    const data = headerMenues.find(x => x.Key === key);
    return data?.Hrefs?.[locale] ?? undefined;
}