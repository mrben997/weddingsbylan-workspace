import { FetchDelay } from "@/modules/Library/Helpers";
import { CreateHttpService } from "./gateway";
import ServiceBase from "./service.base";
export interface IResponseUpload {
    message: string
    filename: string
}
class ServiceUpload extends ServiceBase {

    constructor() {
        super(CreateHttpService(`${window.location.origin}/api/upload`))
    }

    uploadSettingImage = async (file: File, signal?: AbortSignal) => {
        const formData = new FormData();
        formData.append('file', file);
        const data = await this.PushNotify(this.Post<FormData>, "/setting-image", formData, {
            signal,
        })
        return data as IResponseUpload
    }
    uploadNewsImage = async (file: File, signal?: AbortSignal) => {
        const formData = new FormData();
        formData.append('file', file);
        const data = await this.PushNotify(this.Post<FormData>, "/news-image", formData, {
            signal,
        })
        return data as IResponseUpload
    }
    uploadServiceImage = async (file: File, signal?: AbortSignal) => {
        const formData = new FormData();
        formData.append('file', file);
        const data = await this.PushNotify(this.Post<FormData>, "/service-image", formData, {
            signal,
        })
        return data as IResponseUpload
    }

    uploadRecruitmentImage = async (file: File, signal?: AbortSignal) => {
        const formData = new FormData();
        formData.append('file', file);
        const data = await this.PushNotify(this.Post<FormData>, "/recruitment-image", formData, {
            signal,
        })
        return data as IResponseUpload
    }
}

export const serviceUpload = new ServiceUpload()