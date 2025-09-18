import { IRecruitment } from "@/admin-react-app/model";
import { CRUDService } from "@/admin-react-app/services/crud.service";

export const RecruitmentService = new CRUDService<IRecruitment, number>("recruitments")