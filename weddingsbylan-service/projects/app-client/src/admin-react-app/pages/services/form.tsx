import { IService } from '@/admin-react-app/model'
import { ConvertTitleToAscii, getLocale } from '@/admin-react-app/ultilities/helper'
import { getTranslation } from '@/locales/helper'
import { TLanguage } from '@/locales/types'
import { CreateFormGridLayout, CreateFormUI, FormModalWrapper, FormValidator, IFormBase, ISlots, SingleRuleValidate } from '@/modules/Library/Forms'
import { CreateCheckboxSingle, CreateSelectSimple } from '@/modules/Library/Forms/Inputs'
import CreateTextCkEditor from '@/modules/Library/Forms/Inputs/CreateTextCkEditor'
import { Box, SxProps, Theme } from '@mui/material'
import { FC, useState } from 'react'
import { serviceService } from './service'
import { LayoutTabLocale } from '../components/layout.tab.locale'
import { LayoutLoading } from '../components/layout.loading'
import createUploadImage from '@/modules/Library/Forms/Inputs/CretaeUploadImage'
import { serviceUpload } from '@/admin-react-app/services/service.upload'
import { GetImageUrl } from '@/shared/helper'
import { ApiAlertContext } from '@/modules/Library/ApiContext'
import { EServiceSettingArea, EServiceType, IServiceDTO, IServiceSetting } from './types'
import { getServiceSettingAreaOptions, getServiceTypeOptions, mapService, mapServices } from './configs'

const language = getTranslation(getLocale())

var formValidate = new FormValidator<Partial<IServiceDTO>>({
  Name: {
    Rules: [{ rule: SingleRuleValidate.Required }]
  },
  Tags: {
    Rules: [{ rule: SingleRuleValidate.Required }]
  },
  IsActive: {
    Rules: [{ rule: SingleRuleValidate.Required }]
  }
})

const FormInstance = CreateFormGridLayout({
  validate: formValidate,
  configs: [
    {
      key: 'Name',
      label: language.TableName
    },
    {
      key: 'IsActive',
      label: language.TableStatus,
      inputElement: CreateCheckboxSingle<IServiceDTO>({})
    },
    // {
    //   key: 'Content',
    //   // inputElement: CreateTextCkEditor<IService>({}),
    //   inputElement: FormInputSettings,
    //   label: language.TableContent
    // },
    {
      key: 'Type',
      label: 'Type',
      reponsives: { xs: 12, md: 6 },
      inputElement: CreateSelectSimple<IServiceDTO>({ options: getServiceTypeOptions() })
    },
    {
      key: 'Area',
      label: 'Area',
      reponsives: { xs: 12, md: 6 },
      inputElement: CreateSelectSimple<IServiceDTO>({ options: getServiceSettingAreaOptions() })
    },
    {
      key: 'Description',
      label: language.TableDescription,
      inputElement: CreateTextCkEditor<IServiceDTO>({})
    },
    {
      key: 'Tags',
      label: language.TableTags
    },
    {
      key: 'ImageUrl',
      label: 'ImageUrl',
      inputElement: createUploadImage<IServiceDTO>({
        upload: async (file) => {
          const data = await serviceUpload.uploadServiceImage(file)
          return await Promise.resolve(data.filename)
        },
        renderUrl: (filename?: string) => GetImageUrl('Service', filename) ?? '',
        size: {
          height: 352,
          width: 375
        }
      })
    }
  ],
  submitMapping: (value, oldValue) => {
    const obj = Object.assign({}, oldValue, value)

    if (obj?.Name) {
      obj.KeyName = ConvertTitleToAscii(obj.Name)?.toLocaleLowerCase()
    }

    const setting: IServiceSetting = {
      version: '0.0.1',
      data: {
        area: (obj.Area as EServiceSettingArea) ?? EServiceSettingArea.photography,
        type: (obj.Type as EServiceType) ?? EServiceType.package
      }
    }
    delete obj.Area
    delete obj.Type

    obj.Content = JSON.stringify(setting)
    return obj
  }
})
interface IFormInfoProps {
  data?: IService
  onSubmit: (value: Partial<IService>) => Promise<void>
  tilte: string
  slots?: ISlots<IService>
}
const FormInfo: FC<IFormInfoProps> = (props) => {
  return (
    <Box sx={{ flex: 1 }}>
      <FormModalWrapper title={props.tilte}>
        <FormInstance onSubmit={props.onSubmit} data={props.data} slots={props.slots} />
      </FormModalWrapper>
    </Box>
  )
}

interface IFormEditInfoProps {
  data: IService
  onSubmit: (value: Partial<IService>) => Promise<void>
  tilte: string
  slots?: ISlots<IService>
  onCreateSubmit: (value: Partial<IService>) => Promise<void>
}
export const FormEditInfo: FC<IFormEditInfoProps> = (props) => {
  const [data, setData] = useState<Record<TLanguage, IService | undefined>>({} as any)
  const [loading, setLoading] = useState<'loading' | 'error' | 'done'>('loading')
  const fetchItem = async (locale: TLanguage) => {
    try {
      setLoading('loading')
      const res = await serviceService.Filter({
        where: {
          Key: props.data.Key,
          Locale: locale
        }
      })
      if (!res) {
        setLoading('error')
        return
      }
      setLoading('done')
      const temp = { ...data, [locale]: res[0] ? mapService(res[0]) : null }
      setData(temp)
    } catch (error) {
      setLoading('error')
    }
  }

  return (
    <Box sx={{ flex: 1 }}>
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
            return (
              <FormInstance
                onSubmitCallback={(state) => {
                  if (state.status === 'Success') {
                    fetchItem(locale)
                  } else {
                    ApiAlertContext.ApiAlert?.PushError('An error occurred.')
                  }
                }}
                key={locale}
                onSubmit={d === null ? props.onCreateSubmit : props.onSubmit}
                data={d}
                slots={{
                  components: {
                    bottom: (
                      <>
                        <input name='Key' value={props.data.Key} hidden onChange={() => {}} />
                        <input name='Locale' value={locale} hidden onChange={() => {}} />
                        <input name='KeyName' value={d?.KeyName} hidden onChange={() => {}} />
                      </>
                    )
                  }
                }}
              />
            )
          }}
        </LayoutTabLocale>
      </FormModalWrapper>
    </Box>
  )
}

export default FormInfo
