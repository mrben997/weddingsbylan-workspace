import { FetchDelay } from "@/modules/Library/Helpers";
import { IChangePassword } from "../model";
import { CreateHttpService } from "./gateway";
import ServiceBase from "./service.base";

class ServiceUser extends ServiceBase {
    constructor() {
        super(CreateHttpService(`${window.location.origin}/api/users`))
    }
    ChanngePassword = (model: Partial<IChangePassword>, signal?: AbortSignal) => {
        return FetchDelay(() => this.PushNotify(this.Post, '/change-password', model,
            {
                signal,
                headers: {
                    "content-type": "application/json"
                }
            }
        ), 1000)
    }
}

export const serviceUser = new ServiceUser()
