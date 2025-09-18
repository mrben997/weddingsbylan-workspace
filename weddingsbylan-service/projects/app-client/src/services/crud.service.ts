import { CreateHttpService } from "@/admin-react-app/services/gateway";
import { AxiosInstance, AxiosRequestConfig } from "axios";
export const Sleep = (sec: number) => new Promise((res) => setTimeout(res, sec))
export const FetchDelay = async function <TModel>(action: () => Promise<TModel>, sec: number) {
    const [res] = await Promise.all([action(), Sleep(sec)])
    return res
}
export class CRUDService<TModel, EntityId> {
    _http: AxiosInstance
    constructor(name: string) {
        this._http = CreateHttpService(`${process.env.API_URL}${name}`)
        //TODO:
        // this._http = CreateHttpService(`https://app-client-ochre.vercel.app/api/${name}`)
    }
    async Get<TModel>(url: string, config?: AxiosRequestConfig | undefined) {
        const response = await this._http.get<TModel>(url, config)
        return response.data
    }
    async TryGet<TModel>(url: string, config?: AxiosRequestConfig | undefined) {
        try {
            return this.Get<TModel>(url, config)
        } catch (e) {
            console.log(url);
            console.log(e);
            return null
        }
    }

    Filter = async (filter: any, signal?: AbortSignal) => {
        const data = await this.TryGet<TModel[]>("/", {
            signal,
            params: {
                filter
            }
        })
        return data
    }
}