// import { INews } from "@/admin-react-app/model";
// import CreateForm from "@/modules/Library/FormHelpers/CreateForm";
// import { FormValidator, IFormBase } from "@/modules/Library/Forms";
// import { FC } from "react";

// interface IFormInfoProps extends IFormBase<INews> { }
// const FormInfo: FC<IFormInfoProps> = () => {
//     return <></>
// }

// var formValidate = new FormValidator<Partial<INews>>({

// })
// export const FormInstance = CreateForm(formValidate, FormInfo)

import { INews } from "@/admin-react-app/model";
import { ConvertTitleToAscii, getLocale } from "@/admin-react-app/ultilities/helper";
import { getTranslation } from "@/locales/helper";
import { CreateFormGridLayout, CreateFormUI, FormModalWrapper, FormValidator, IFormBase, ISlots, SingleRuleValidate } from "@/modules/Library/Forms";
import { CreateCheckboxSingle, CreateInputTextMultiline } from "@/modules/Library/Forms/Inputs";
import CreateTextCkEditor from "@/modules/Library/Forms/Inputs/CreateTextCkEditor";
import { Box, SxProps, Theme } from "@mui/material";
import { ComponentType, FC, useState } from "react";
import { LayoutTabLocale } from "../components/layout.tab.locale";
import { LayoutLoading } from "../components/layout.loading";
import { TLanguage } from "@/locales/types";
import { newSService } from "./service";
import createUploadImage from "@/modules/Library/Forms/Inputs/CretaeUploadImage";
import { serviceUpload } from "@/admin-react-app/services/service.upload";
import { GetImageUrl } from "@/shared/helper";

var formValidate = new FormValidator<Partial<INews>>({
    Content: {
        Rules: [{ rule: SingleRuleValidate.Required, }]
    },
    Name: {
        Rules: [{ rule: SingleRuleValidate.Required }]
    },
    Tags: {
        Rules: [{ rule: SingleRuleValidate.Required }]
    },
    Key: {
        Rules: [{ rule: SingleRuleValidate.Required }]
    }
})

const language = getTranslation(getLocale())

const FormInstance = CreateFormGridLayout({
    validate: formValidate,
    configs: [
        {
            key: 'Name',
            label: language.TableName,
        },
        {
            key: 'IsActive',
            label: language.TableStatus,
            inputElement: CreateCheckboxSingle<INews>({}),
        },
        {
            key: 'Description',
            label: language.TableDescription,
            inputElement: CreateTextCkEditor<INews>({})
        },
        {
            key: 'Tags',
            label: language.TableTags,
            inputElement: CreateInputTextMultiline({ options: { maxLength: 1000 } }) as ComponentType
        },
        {
            key: 'ImageUrl',
            label: 'ImageUrl',
            inputElement: createUploadImage<INews>({
                upload: async (file) => {
                    const data = await serviceUpload.uploadNewsImage(file)
                    return await Promise.resolve(data.filename)
                },
                renderUrl: (filename?: string) => GetImageUrl('News', filename) ?? "",
                size: {
                    height: 352,
                    width: 375
                }
            })
        },
        {
            key: 'Content',
            label: language.TableContent,
            inputElement: CreateTextCkEditor<INews>({})
        }
    ],
    submitMapping: (value, oldValue) => {
        const model = Object.assign({}, oldValue, value)

        if (model?.Name) {
            model.KeyName = ConvertTitleToAscii(model.Name)?.toLocaleLowerCase()
        }
        return model
    },
})
interface IFormInfoProps {
    onSubmit: (value: Partial<INews>) => Promise<void>
    tilte: string
    slots?: ISlots<INews>
}
const FormInfo: FC<IFormInfoProps> = (props) => {
    return <Box sx={{ flex: 1, }}>
        <FormModalWrapper title={props.tilte}>
            <FormInstance onSubmit={props.onSubmit} slots={props.slots} />
        </FormModalWrapper>
    </Box>
}


interface IFormEditInfoProps {
    data: INews
    onSubmit: (value: Partial<INews>) => Promise<void>
    tilte: string
    slots?: ISlots<INews>
    onCreateSubmit: (value: Partial<INews>) => Promise<void>
}
export const FormEditInfo: FC<IFormEditInfoProps> = (props) => {
    const [data, setData] = useState<Record<TLanguage, INews | undefined>>({} as any)
    const [loading, setLoading] = useState<"loading" | "error" | "done">("loading")
    const fetchItem = async (locale: TLanguage) => {
        try {
            setLoading("loading")
            const res = await newSService.Filter({
                where: {
                    Key: props.data.Key,
                    Locale: locale
                }
            });
            if (!res) {
                setLoading("error")
                return
            }
            setLoading('done')
            const temp = { ...data, [locale]: res[0] ?? null }
            setData(temp)
        } catch (error) {
            setLoading('error')
        }
    }

    return <Box sx={{ flex: 1, }}>
        <FormModalWrapper title={props.tilte}>
            <LayoutTabLocale>
                {(locale) => {
                    const d = data[locale]
                    if (d === undefined) {
                        fetchItem(locale)
                    }
                    if (loading !== 'done') {
                        return loading === 'error' ? <>Error</> : <LayoutLoading loading={loading === 'loading'}></LayoutLoading>
                    }
                    return <FormInstance
                        onSubmitCallback={(state) => {
                            fetchItem(locale)
                        }}
                        key={locale}
                        onSubmit={d === null ? props.onCreateSubmit : props.onSubmit}
                        data={d}
                        slots={{
                            components: {
                                bottom: <>
                                    <input name="Key" value={props.data.Key} hidden />
                                    <input name="Locale" value={locale} hidden />
                                    <input name="KeyName" value={d?.KeyName} hidden />
                                </>
                            }
                        }} />
                }}
            </LayoutTabLocale>
        </FormModalWrapper>
    </Box>
}

export default FormInfo