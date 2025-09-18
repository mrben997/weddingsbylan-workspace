import { INews } from "@/admin-react-app/model";
import { CRUDService } from "./crud.service";
import { NEW_PAGE_SIZE } from "./_config.page";

class NewsService extends CRUDService<INews, number> {
    Filter = async (filter: any, signal?: AbortSignal) => {
        const data = await this.TryGet<INews[]>("/", {
            signal,
            params: {
                filter
            }
        })
        return data
    }
    Random = async (count: number, locale: string, signal?: AbortSignal) => {
        const data = await this.TryGet<INews[]>("/random", {
            signal,
            params: {
                count, locale
            }
        })
        return data
    }
    Count = (where: any) => {
        return this.Get<{ count: number }>("count", {
            params: { where: { ...where, IsActive: true } }
        })
    }
    AllWithLocale = (pageStr?: string, locale?: string) => {
        // Set pagination variables
        const page = pageStr ? parseInt(pageStr) : 1; // The page you want to retrieve
        const pageSize = NEW_PAGE_SIZE; // Number of items per page
        // Calculate skip value
        const skip = (page - 1) * pageSize;
        return this.Filter({
            where: { Locale: locale, IsActive: true },
            order: "Key ASC",
            limit: pageSize,
            skip: skip,
        })
    }

}

export const newsService = new NewsService("news")