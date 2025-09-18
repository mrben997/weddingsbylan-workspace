import { FetchDelay } from "@/modules/Library/Helpers";
import { CreateHttpService } from "./gateway";
import ServiceBase from "./service.base";
import { TLanguage } from "@/locales/types";

export class CRUDService<TModel, EntityId> extends ServiceBase {
    constructor(name: string) {
        super(CreateHttpService(`${window.location.origin}/api/${name}`))
    }

    All = (signal?: AbortSignal) => {
        return FetchDelay(async () => {
            const data = await this.TryGet<TModel[]>("/", {
                signal,
            })
            return data !== null ? data : []
        }, 500)
    }
    Filter = (filter: any, signal?: AbortSignal) => {
        return FetchDelay(async () => {
            const data = await this.TryGet<TModel[]>("/", {
                signal,
                params: {
                    filter
                }
            })
            return data
        }, 500)
    }

    AllWithLocale = (locale?: string) => {
        return this.Filter({ where: { Locale: locale } })
    }

    Create = (model: Partial<TModel>, signal?: AbortSignal) => {
        return FetchDelay(async () => {
            const data = await this.PushNotify(this.Post<TModel>, "/", model, {
                signal,
            })
            return data as TModel
        }, 500)
    }
    Update = (Id: EntityId, model: Partial<TModel>, signal?: AbortSignal) => {
        return FetchDelay(async () => {
            const data = await this.PushNotify(this.Put<TModel>, "/" + Id, model, {
                signal,
            })
            return data
        }, 500)
    }
    UpdatePartial = (Id: EntityId, model: Partial<TModel>, signal?: AbortSignal) => {
        return FetchDelay(async () => {
            const data = await this.PushNotify(this.Patch<TModel>, "/" + Id, model, {
                signal,
            })
            return data
        }, 500)
    }
    UpdateWhere = (where: any, model: Partial<TModel>, signal?: AbortSignal) => {
        return FetchDelay(async () => {
            const data = await this.PushNotify(this.Patch<TModel>, "/", model, {
                signal,
                params: {
                    where
                }
            })
            return data
        }, 500)
    }
    Remove = (Id: EntityId, signal?: AbortSignal) => {
        return FetchDelay(async () => {
            const data = await this.PushNotify(this.Delete<TModel>, "/" + Id, {
                signal,
            })
            return data
        }, 500)
    }
}