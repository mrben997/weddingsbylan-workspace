import { INews } from "@/admin-react-app/model";
import { IFormBase } from "@/modules/Library/Forms";
import { FC } from "react";
import FormInstance, { FormEditInfo } from "./form";

interface IFormEditProps {
    onSubmit: (data: Partial<INews>) => Promise<void>
    onCreateSubmit: (data: Partial<INews>) => Promise<void>
    title: string
    data: INews
}
export const FormEdit: FC<IFormEditProps> = (props) => {
    return <FormEditInfo tilte={props.title} onCreateSubmit={props.onCreateSubmit} onSubmit={props.onSubmit} data={props.data} />
}