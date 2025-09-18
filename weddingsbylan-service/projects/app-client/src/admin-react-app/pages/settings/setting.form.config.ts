import createUploadImage from '@/modules/Library/Forms/Inputs/CretaeUploadImage'
import { ISettingStruct } from './types'
import { Sleep } from '@/modules/Library/Helpers'
import { serviceUpload } from '@/admin-react-app/services/service.upload'
import CreateTextCkEditor from '@/modules/Library/Forms/Inputs/CreateTextCkEditor'
import { CreateInputTextMultiline, CreateSelectSimple } from '@/modules/Library/Forms/Inputs'
import { getTranslation } from '@/locales/helper'

const language = getTranslation('en')

export const SettingStruct: ISettingStruct = {
  Setting: {
    title: 'General Settings',
    DefineKey: { Area: 'Global', FormKey: 'Setting' },
    isSingle: true,
    renderForm: (data) => [
      {
        key: 'LogoUrl',
        label: 'Logo URL',
        inputElement: createUploadImage({
          upload: async (file) => {
            await Sleep(1000)
            const data = await serviceUpload.uploadSettingImage(file)
            return await Promise.resolve(data.filename)
          },
          renderUrl: (filename?: string) => `/api/images/settings/${filename}`,
          size: { width: 1920, height: 650 }
        })
      },
      {
        key: 'LogoDarkUrl',
        label: 'Logo Dark URL',
        inputElement: createUploadImage({
          upload: async (file) => {
            await Sleep(1000)
            const data = await serviceUpload.uploadSettingImage(file)
            return await Promise.resolve(data.filename)
          },
          renderUrl: (filename?: string) => `/api/images/settings/${filename}`,
          size: { width: 1920, height: 650 }
        })
      }
    ]
  },
  //#region Home Page
  Banner: {
    title: 'Banner',
    DefineKey: { Area: 'Home', FormKey: 'Banner' },
    renderForm: (data) => {
      return [
        { key: 'SubTitle', label: 'Sub Title' },
        { key: 'Title', label: 'Title' },
        { key: 'Content', label: 'Content', inputElement: CreateInputTextMultiline({ options: { maxLength: 1000 } }) },
        { key: 'Href', label: 'Href' },
        {
          key: 'ImageUrl',
          label: 'ImageUrl',
          inputElement: createUploadImage({
            upload: async (file) => {
              await Sleep(1000)
              const data = await serviceUpload.uploadSettingImage(file)
              return await Promise.resolve(data.filename)
            },
            renderUrl: (filename?: string) => `/api/images/settings/${filename}`,
            size: { width: 1920, height: 650 }
          })
        }
      ]
    }
  },
  About: {
    title: 'About',
    DefineKey: { Area: 'Home', FormKey: 'About' },
    isSingle: true,
    renderForm: (data) => {
      return [
        { key: 'Title', label: 'Title' },
        { key: 'Content', label: 'Content', inputElement: CreateInputTextMultiline({ options: { maxLength: 1000 } }) },

        { key: 'Href', label: 'Href' }
      ]
    }
  },
  AboutImage: {
    title: 'About Image',
    DefineKey: { Area: 'Home', FormKey: 'AboutImage' },
    isSingle: true,
    renderForm: (data) => {
      return [
        {
          key: 'ImageUrl',
          label: 'ImageUrl',
          inputElement: createUploadImage({
            upload: async (file) => {
              await Sleep(1000)
              const data = await serviceUpload.uploadSettingImage(file)
              return await Promise.resolve(data.filename)
            },
            renderUrl: (filename?: string) => `/api/images/settings/${filename}`,
            size: { width: 1920, height: 650 }
          })
        }
      ]
    }
  },
  Service: {
    title: 'Service',
    DefineKey: { Area: 'Home', FormKey: 'Service' },
    isSingle: true,
    renderForm: (data) => {
      return [
        { key: 'Title', label: 'Title' },
        { key: 'Content', label: 'Content', inputElement: CreateInputTextMultiline({ options: { maxLength: 1000 } }) },
        { key: 'Href', label: 'Href' }
      ]
    }
  },
  ServiceImage: {
    title: 'Service Image',
    DefineKey: { Area: 'Home', FormKey: 'ServiceImage' },
    isSingle: true,
    renderForm: (data) => {
      return [
        {
          key: 'ImageUrl',
          label: 'Background Image',
          inputElement: createUploadImage({
            upload: async (file) => {
              await Sleep(1000)
              const data = await serviceUpload.uploadSettingImage(file)
              return await Promise.resolve(data.filename)
            },
            renderUrl: (filename?: string) => `/api/images/settings/${filename}`,
            size: { width: 1920, height: 650 }
          })
        }
      ]
    }
  },
  Footer: {
    title: 'Footer',
    DefineKey: { Area: 'Home', FormKey: 'Footer' },
    isSingle: true,
    renderForm: (data) => {
      return [
        {
          key: 'LogoUrl',
          label: 'Logo Image',
          inputElement: createUploadImage({
            upload: async (file) => {
              await Sleep(1000)
              const data = await serviceUpload.uploadSettingImage(file)
              return await Promise.resolve(data.filename)
            },
            renderUrl: (filename?: string) => `/api/images/settings/${filename}`,
            size: { width: 1920, height: 650 }
          })
        }
        // {
        //   key: 'BgUrl',
        //   label: 'Background Image',
        //   inputElement: CretaeUploadImage({
        //     upload: async (file) => {
        //       await Sleep(1000)
        //       const data = await serviceUpload.uploadSettingImage(file)
        //       return await Promise.resolve(data.filename)
        //     },
        //     renderUrl: (filename?: string) => `/api/images/settings/${filename}`,
        //     size: { width: 1920, height: 650 }
        //   })
        // }
      ]
    }
  },
  //#endregion Home Page

  //#region Makeup & Hair Page
  MahAbout: {
    title: 'Makeup & Hair About',
    DefineKey: { Area: 'MakeupAndHair', FormKey: 'MahAbout' },
    isSingle: true,
    renderForm: (data) => {
      return [
        { key: 'Title', label: 'Title' },
        { key: 'Content', label: 'Content', inputElement: CreateInputTextMultiline({ options: { maxLength: 1000 } }) }
      ]
    }
  },
  MahAboutImage: {
    title: 'Makeup & Hair About Image',
    DefineKey: { Area: 'MakeupAndHair', FormKey: 'MahAboutImage' },
    isSingle: true,
    renderForm: (data) => {
      return [
        {
          key: 'ImageUrl',
          label: 'ImageUrl',
          inputElement: createUploadImage({
            upload: async (file) => {
              await Sleep(1000)
              const data = await serviceUpload.uploadSettingImage(file)
              return await Promise.resolve(data.filename)
            },
            renderUrl: (filename?: string) => `/api/images/settings/${filename}`,
            size: { width: 1920, height: 650 }
          })
        }
      ]
    }
  },
  //#endregion Makeup & Hair Page
}
