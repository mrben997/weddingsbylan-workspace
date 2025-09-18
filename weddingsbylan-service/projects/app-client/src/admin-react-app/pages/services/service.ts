import { INews, IService } from "@/admin-react-app/model";
import { CRUDService } from "@/admin-react-app/services/crud.service";

export const serviceService = new CRUDService<IService, number>("services")