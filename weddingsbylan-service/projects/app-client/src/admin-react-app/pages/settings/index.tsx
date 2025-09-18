import React, { Component, ComponentType, FC } from 'react'
import LayoutContainer from '../components/layout.container'
import './index.css'
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { QueryParam } from '@/modules/Library/Helpers';
import { IQueryParam } from '@/shared/components/edit.mode';
import { LayoutBlockTemplate } from './layout.block.template';
import { ISetting } from '@/admin-react-app/model';
import { SettingStruct } from './setting.form.config';
import { IFormModel, ISettingItemConfig, ISettingStruct } from './types';
import { settingSService } from './service';
import { getLocale } from '@/admin-react-app/ultilities/helper';
import { v4 as uuidv4 } from 'uuid'
import { LayoutTabLocale } from '../components/layout.tab.locale';
import { TLanguage } from '@/locales/types';
import data from '@/services/static-data/data';
import IframeBlock from './iframe.block';
import { OpenMobileMenu } from '@/admin-react-app/layout';

// Functional component để lấy navigate
const NavigateWrapper = (WrapComponented: ComponentType<any>) => (props: any) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    return <WrapComponented {...props} navigate={navigate} />;
};
interface ISettingProps {
    navigate: NavigateFunction
}
interface ISearchParam {
    data: string
}
interface ISettingState {
    data: Record<TLanguage, ISetting[] | null | undefined>
    refreshKey: any
    editKey?: string,
    isNew?: boolean
    locale: TLanguage
    loading: boolean
}
class Setting extends Component<ISettingProps, ISettingState> {
    constructor(props: ISettingProps) {
        super(props)
        this.refFrame = React.createRef<HTMLIFrameElement>()
        this.state = {
            refreshKey: "key",
            locale: 'vn',
            data: {} as any,
            loading: true
        }
        this.refLayout = React.createRef<LayoutContainer<ISettingStruct>>()
    }
    refFrame: React.RefObject<HTMLIFrameElement>
    onMessage = (ev: MessageEvent<any>) => {
        try {
            const data = JSON.parse(ev.data) as IQueryParam
            this.props.navigate('?or=open&data=' + encodeURIComponent(ev.data) + "&locale=" + getLocale());
            this.setState({ data: {} as any, editKey: data.editKey, refreshKey: data.editKey, locale: getLocale() ?? "vn" })
        } catch (error) {

        }
    }

    componentWillUnmount(): void {
        window.removeEventListener('message', this.onMessage)
    }
    componentDidMount(): void {
        window.addEventListener('message', this.onMessage)
        const editKey = this.getQueryEditKey()
        editKey && this.setState({ editKey })
    }
    loadData = (data?: Record<TLanguage, ISetting[] | null | undefined>) => {
        this.state.editKey && this.settupData(this.state.locale, this.state.editKey, data)
    }
    componentDidUpdate(prevProps: Readonly<ISettingProps>, prevState: Readonly<ISettingState>, snapshot?: any): void {
        if (
            prevState.editKey !== this.state.editKey
            || !this.state.data[this.state.locale]
        ) {
            this.loadData()
        }
    }
    extractKey = (data: Partial<IFormModel>) => {
        return 'key' + data.Id?.toString()
    }

    onSubmitAll = async (x: Partial<IFormModel>[]) => {
        if (!this.state.data) return
        const setting = this.state.data[this.state.locale]
        if (!setting) {
            return
        }
        if (this.state.isNew) {
            const model = this.createSettingModel(x)
            await settingSService.Create(model)
        } else {
            await settingSService.UpdatePartial(setting[0].Id, this.EditSettingModel(x))
        }
        const temp = { ...this.state.data, [this.state.locale]: undefined }
        this.loadData(temp)
    }
    ClearSetupField = (x: Partial<IFormModel>[]) => {
        for (let index = 0; index < x.length; index++) {
            const element = x[index];
            delete element.IsNew
        }
    }
    EditSettingModel = (x: Partial<IFormModel>[]): Partial<ISetting> => {
        this.ClearSetupField(x)
        return {
            Content: JSON.stringify(x),
        }
    }
    createSettingModel = (x: Partial<IFormModel>[]): Omit<ISetting, "Id"> => {
        this.ClearSetupField(x)
        const first = x[0]
        if (!first.Area || !first.FormKey) {
            throw new Error("Area or FormKey can not null!")
        }
        return {
            Area: first.Area,
            Type: first.FormKey,
            Content: JSON.stringify(x),
            Locale: this.state.locale
        }
    }

    fetchData = async (local: TLanguage, editKey: string) => {
        const value = SettingStruct[editKey as keyof ISettingStruct]
        if (value) {
            try {
                return await settingSService.Filter({
                    where: {
                        Type: value.DefineKey.FormKey,
                        Area: value.DefineKey.Area,
                        Locale: local
                    }
                });
            } finally {
            }
        }
    }
    settupData = async (local: TLanguage, editKey: string, dataInput?: Record<TLanguage, ISetting[] | null | undefined>) => {
        dataInput && this.setState({ data: dataInput })
        const data = await this.fetchData(local, editKey)
        this.setData(data)
    }
    mapSettingToModel = (data?: ISetting): IFormModel[] => {
        const content = data?.Content ? JSON.parse(data.Content) : []
        return content
    }
    mapBlockHandle: Record<string, LayoutBlockTemplate | undefined | null> = {}
    renderConfigMap = (): Record<keyof ISetting | string, JSX.Element> => {
        return (Object.keys(SettingStruct) as (keyof ISettingStruct)[]).reduce((map, key) => {
            const value = SettingStruct[key] as ISettingItemConfig<IFormModel>
            map[key] = <LayoutTabLocale locale={this.state.locale}>
                {(locale) => {
                    if (this.state.locale !== locale) {
                        this.setState({ locale })
                        return <></>
                    }

                    const dataTemp = this.state.data ? this.state.data[this.state.locale] : undefined

                    return <LayoutBlockTemplate
                        // isSingleSubmit={true}
                        ref={(ref: any) => this.mapBlockHandle[key] = ref}
                        key={this.state.refreshKey}
                        isError={dataTemp === null}
                        // isError={true}
                        isSingle={value.isSingle}
                        Area={value.DefineKey.Area}
                        FormKey={value.DefineKey.FormKey}
                        extractKey={this.extractKey}
                        title={value.title}
                        data={this.mapSettingToModel(dataTemp ? dataTemp[0] : undefined)}
                        onSubmitAll={this.onSubmitAll}
                        renderConfig={value.renderForm} />
                }}
            </LayoutTabLocale>
            return map
        }, {} as Record<keyof ISetting | string, JSX.Element>)
    }
    getQueryEditKey = () => {
        return QueryParam.TryParseJson<IQueryParam>(QueryParam.Gets<ISearchParam>('data').data ?? '')?.editKey
    }
    setData = (data?: ISetting[] | null) => {
        const temp = { ...this.state.data, [this.state.locale]: data }
        this.setState({ data: temp, isNew: !data?.length, refreshKey: new Date().toISOString() })
    }
    onRightModalClose = () => {
        const temp = { ...this.state.data, [this.state.locale]: undefined }
        this.setState({ data: temp, refreshKey: new Date().getTime().toString(), editKey: undefined })
    }
    refLayout: React.RefObject<LayoutContainer<ISettingStruct>>
    LayoutContainerSetting = LayoutContainer<ISettingStruct>
    render() {
        const { LayoutContainerSetting } = this
        return (
            <>
                <OpenMobileMenu />
                <LayoutContainerSetting
                    isLoading={!this.state.data[this.state.locale]}
                    sx={{ gap: '5px' }}
                    onClose={this.onRightModalClose}
                    getContentKey={() => this.getQueryEditKey()}
                    ContentMap={this.renderConfigMap()}
                >
                    <IframeBlock ref={this.refFrame} src={`/${getLocale()}/edit-mode?`} width={"100%"} height={"100%"} />
                </LayoutContainerSetting>
            </>
        )
    }

}




export default NavigateWrapper(Setting)