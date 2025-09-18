import { INews, ISetting } from "@/admin-react-app/model";
import { CRUDService } from "@/admin-react-app/services/crud.service";


export const settingSService = new CRUDService<ISetting, number>("settings")

