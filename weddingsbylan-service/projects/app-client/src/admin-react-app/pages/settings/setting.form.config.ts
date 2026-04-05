import createUploadImage from '@/modules/Library/Forms/Inputs/CretaeUploadImage'
import { ISettingStruct } from './types'
import { FetchDelay, Sleep } from '@/modules/Library/Helpers'
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
  SocialLinks: {
    title: 'Social Links',
    DefineKey: { Area: 'Global', FormKey: 'SocialLinks' },
    isSingle: true,
    renderForm: (data) => [
      { key: 'FacebookUrl', label: 'Facebook URL' }, // https://www.facebook.com
      { key: 'InstagramUrl', label: 'Instagram URL' }, // https://www.instagram.com
      { key: 'PinterestUrl', label: 'Pinterest URL' }, // https://www.pinterest.com
      { key: 'TikTokUrl', label: 'TikTok URL' }, // https://www.tiktok.com
      { key: 'YoutubeUrl', label: 'Youtube URL' } // https://www.youtube.com
    ]
  },
  Footer: {
    title: 'Footer',
    DefineKey: { Area: 'Global', FormKey: 'Footer' },
    isSingle: true,
    renderForm: (data) => {
      return [
        {
          key: 'BgUrl',
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
  HomePhotography: {
    title: 'Home Photography',
    DefineKey: { Area: 'Home', FormKey: 'HomePhotography' },
    isSingle: true,
    renderForm: (data) => {
      return [
        { key: 'Title', label: 'Title' },
        { key: 'Content', label: 'Content', inputElement: CreateInputTextMultiline({ options: { maxLength: 1000 } }) },

        { key: 'Href', label: 'Href' }
      ]
    }
  },
  HomePhotographyImage: {
    title: 'Home Photography Image',
    DefineKey: { Area: 'Home', FormKey: 'HomePhotographyImage' },
    isSingle: true,
    renderForm: () => {
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
  HomeMakeupAndHair: {
    title: 'Home Makeup & Hair',
    DefineKey: { Area: 'Home', FormKey: 'HomeMakeupAndHair' },
    isSingle: true,
    renderForm: (data) => {
      return [
        { key: 'Title', label: 'Title' },
        { key: 'Content', label: 'Content', inputElement: CreateInputTextMultiline({ options: { maxLength: 1000 } }) },
        { key: 'Href', label: 'Href' }
      ]
    }
  },
  HomeMakeupAndHairImage: {
    title: 'Home Makeup & Hair Image',
    DefineKey: { Area: 'Home', FormKey: 'HomeMakeupAndHairImage' },
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
  HomePortfolio: {
    title: 'Home Portfolio',
    DefineKey: { Area: 'Home', FormKey: 'HomePortfolio' },
    isSingle: true,
    renderForm: (data) => {
      return [
        { key: 'Title', label: 'Title' },
        { key: 'Description', label: 'Description', inputElement: CreateInputTextMultiline({ options: { maxLength: 1000 } }) },
        { key: 'Href', label: 'Href' }
      ]
    }
  },
  HomePortfolioItems: {
    title: 'Home Portfolio Items',
    DefineKey: { Area: 'Home', FormKey: 'HomePortfolioItems' },
    renderForm: (data) => [
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
  },
  HomePortfolioImage: {
    title: 'Home Portfolio Image',
    DefineKey: { Area: 'Home', FormKey: 'HomePortfolioImage' },
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
  //#endregion
  //#region Makeup & Hair Page
  MakeupAndHairAbout: {
    title: 'Makeup & Hair About',
    DefineKey: { Area: 'MakeupAndHair', FormKey: 'MakeupAndHairAbout' },
    isSingle: true,
    renderForm: (data) => {
      return [
        { key: 'Title', label: 'Title' },
        { key: 'Content', label: 'Content', inputElement: CreateInputTextMultiline({ options: { maxLength: 1500 } }) },
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
  //#endregion
  //#region Photography Page
  PhotographyAbout: {
    title: 'Photography About',
    DefineKey: { Area: 'Photography', FormKey: 'PhotographyAbout' },
    isSingle: true,
    renderForm: (data) => {
      return [
        { key: 'Title', label: 'Title' },
        { key: 'Content', label: 'Content', inputElement: CreateInputTextMultiline({ options: { maxLength: 1500 } }) },
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
  //#endregion
  //#region Portfolio
  PortfolioSlide: {
    title: 'Portfolio Slide',
    DefineKey: { Area: 'Portfolio', FormKey: 'PortfolioSlide' },
    renderForm: (data) => {
      return [
        { key: 'Title', label: 'Title' },
        {
          key: 'ImageUrl',
          label: 'ImageUrl',
          inputElement: createUploadImage({
            upload: async (file) => {
              const data = await FetchDelay(() => serviceUpload.uploadSettingImage(file), 1000)
              return await Promise.resolve(data.filename)
            },
            renderUrl: (filename?: string) => `/api/images/settings/${filename}`,
            size: { width: 1920, height: 650 }
          })
        }
      ]
    }
  },
  PortfolioDetail: {
    title: 'Portfolio Detail',
    DefineKey: { Area: 'Portfolio', FormKey: 'PortfolioDetail' },
    renderForm: (data) => {
      return [
        { key: 'Title', label: 'Title' },
        { key: 'Description', label: 'Description', inputElement: CreateTextCkEditor({}) }
      ]
    }
  },
  PortfolioInfo: {
    title: 'Portfolio Info',
    DefineKey: { Area: 'Portfolio', FormKey: 'PortfolioInfo' },
    isSingle: true,
    renderForm: (data) => {
      return [
        { key: 'Title', label: 'Title' },
        { key: 'Description', label: 'Description', inputElement: CreateInputTextMultiline({ options: { maxLength: 1500 } }) },
        { key: 'GalleryTitle', label: 'Gallery Title' }
        // {
        //   key: 'ImageUrl',
        //   label: 'ImageUrl',
        //   inputElement: createUploadImage({
        //     upload: async (file) => {
        //       const data = await FetchDelay(() => serviceUpload.uploadSettingImage(file), 1000)
        //       return await Promise.resolve(data.filename)
        //     },
        //     renderUrl: (filename?: string) => `/api/images/settings/${filename}`,
        //     size: { width: 1920, height: 650 }
        //   })
        // }
      ]
    }
  }
  //#endregion
}
