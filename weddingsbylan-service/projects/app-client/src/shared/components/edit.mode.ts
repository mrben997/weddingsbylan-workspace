import { ISettingStruct } from "@/admin-react-app/pages/settings/types"

export interface IQueryParam {
    editKey: string
}
export const getEditModeKey = (key: keyof ISettingStruct) => {
    return { 'data-edit-key': key as string }
}
