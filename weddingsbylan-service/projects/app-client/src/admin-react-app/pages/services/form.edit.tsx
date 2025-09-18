import { IService } from "@/admin-react-app/model";
import { IFormBase } from "@/modules/Library/Forms";
import { FC } from "react";
import { FormEditInfo } from "./form";

interface IFormEditProps {
    onSubmit: (data: Partial<IService>) => Promise<void>
    title: string
    onCreateSubmit: (data: Partial<IService>) => Promise<void>
    data: IService
}
export const FormEdit: FC<IFormEditProps> = (props) => {
    return <FormEditInfo tilte={props.title} onCreateSubmit={props.onCreateSubmit} onSubmit={props.onSubmit} data={props.data} />
}