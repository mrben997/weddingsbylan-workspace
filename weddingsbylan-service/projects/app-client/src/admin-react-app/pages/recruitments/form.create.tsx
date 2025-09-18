import { IRecruitment } from "@/admin-react-app/model";
import { IFormBase } from "@/modules/Library/Forms";
import { FC, useRef } from "react";
import FormInstance from "./form";
import { v4 as uuidv4 } from 'uuid'
interface IFormCreateProps {
    onSubmit: (data: Partial<IRecruitment>) => Promise<void>
    title: string
}
export const FormCreate: FC<IFormCreateProps> = (props) => {
    const ref = useRef(uuidv4())
    return <FormInstance tilte={props.title + " (vn)"} onSubmit={props.onSubmit} slots={{
        components: {
            bottom: <>
                <input name="Key" value={ref.current} hidden />
                <input name="Tags" value={'NONE'} hidden />
            </>
        }
    }} />
}