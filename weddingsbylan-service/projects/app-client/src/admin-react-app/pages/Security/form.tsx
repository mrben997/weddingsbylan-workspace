import { IChangePassword, } from "@/admin-react-app/model";
import { getLocale } from "@/admin-react-app/ultilities/helper";
import { getTranslation } from "@/locales/helper";
import { CreateFormGridLayout, FormModalWrapper, FormValidator, SingleRuleValidate } from "@/modules/Library/Forms";
import { CreateCheckboxSingle, CreateInputText } from "@/modules/Library/Forms/Inputs";
import CreateTextCkEditor from "@/modules/Library/Forms/Inputs/CreateTextCkEditor";
import { Box, } from "@mui/material";
import { FC } from "react";
const language = getTranslation(getLocale())

var formValidate = new FormValidator<Partial<IChangePassword>>({
    oldPassword: {
        Rules: [{ rule: SingleRuleValidate.Required }]
    },
    newPassword: {
        Rules: [{ rule: SingleRuleValidate.Required }]
    },
    confirmPassword: {
        Rules: [
            { rule: SingleRuleValidate.Required },
            {
                rule: SingleRuleValidate.Custom,
                Value(value, model) {
                    return value !== model.newPassword
                },
                message: "confirm password does not match!"
            }
        ]
    }
})

const FormInstance = CreateFormGridLayout({
    validate: formValidate,
    configs: [
        {
            key: 'oldPassword',
            label: language.FormOldPassword,
            inputElement: CreateInputText<IChangePassword>({
                options: {
                    textFieldProps: {
                        type: 'password'
                    }
                }
            })
        },
        {
            key: 'newPassword',
            label: language.FormNewPassword,
            inputElement: CreateInputText<IChangePassword>({
                options: {
                    textFieldProps: {
                        type: 'password'
                    }
                }
            })
        },
        {
            key: 'confirmPassword',
            label: language.FormComfirmPassword,
            inputElement: CreateInputText<IChangePassword>({
                options: {
                    textFieldProps: {
                        type: 'password'
                    }
                }
            })
        },
    ],
})
interface IFormInfoProps {
    onSubmit: (value: Partial<IChangePassword>) => Promise<void>
}
const FormInfo: FC<IFormInfoProps> = (props) => {
    return <Box sx={{ flex: 1, }}>
        <FormInstance onSubmit={props.onSubmit} />
    </Box>
}

export default FormInfo