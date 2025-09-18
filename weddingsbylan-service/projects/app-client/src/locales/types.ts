export type TLanguage = "vn" | "en"
export interface ILanguage {
    Locale: string
    Home: string
    Service: string
    Portfolio: string
    Blog: string
    Recruitment: string
    RecruitmentDetail: string
    Contact: string
    ContactInfo: string
    GiveMeYourInfo: string
    RecentPosts: string
    Logo: string
    ServiceDetail: string,
    BlogDetails: string,
    //menu
    MenuDashboard: string
    MenuNews: string
    MenuSettings: string
    MenuSecurity: string
    MenuSevices: string
    MenuRecruitments: string

    //Table
    TableCreate: string
    TableEdit: string
    TableName: string
    TableDescription: string
    TableStatus: string
    TableTags: string
    TableActions: string
    TableContent: string
    //Security
    FormChangePassword: string
    FormOldPassword: string
    FormNewPassword: string
    FormComfirmPassword: string
    //Home
    JobCV: string
    SendJobCV: string
    SubjectJobCV: string
    SeeAllService: string
    AllService: string
    PortfolioCategories: Record<string, string>
    TitleDefault: string,

    SendMailNow: string

    //Mail
    SubjectMail: string
    BodyMail: string
    Addresses: {
        Title: string
        Description: string
    }[]
    AboutUS: string
    Intro: string
    OtherPost: string
}