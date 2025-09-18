import { IService } from "@/admin-react-app/model";
import { CreateFormComfirm } from "@/modules/Library/Forms";
import { Typography } from "@mui/material";

// ========= ========= ========= Form Delete ========= ========= =========
export const FormDelete = CreateFormComfirm<IService>({
    title: 'Are yout sure delete?',
    content: (x) => <Typography variant='subtitle2'>{x?.Name}</Typography>
})