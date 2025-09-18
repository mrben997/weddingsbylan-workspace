import { INews } from "@/admin-react-app/model";
import { CRUDService } from "@/admin-react-app/services/crud.service";

export const newSService = new CRUDService<INews, number>("news")