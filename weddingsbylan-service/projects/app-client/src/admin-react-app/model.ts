export interface INews {
    Id: number
    Name: string
    Tags: string
    Content: string
    Description: string
    IsActive: boolean
    Key: string
    ImageUrl?: string
    Locale: string
    dateCreated: Date;
    KeyName: string;
}

export interface IService extends INews {
}
export interface IRecruitment extends INews {
}
export type ESettingAreaBase = "Global" | "Home" | "MakeupAndHair"
export type ESettingArea = ESettingAreaBase | string
export interface ISetting {
    Id: number
    Type: string
    Area: ESettingArea
    Title?: string
    Content?: string
    Description?: string
    ImageUrl?: string
    Href?: string
    Locale: string
}

export interface IChangePassword {
    oldPassword: string
    newPassword: string
    confirmPassword: string
}