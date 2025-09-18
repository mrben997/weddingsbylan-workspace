import React, { Component } from 'react'
import { Box, Button, Chip, CircularProgress, Divider, SxProps, TextField, Theme, Typography, TypographyProps } from '@mui/material'
import { IFormInputBase } from '../../types'
import { MergeObjects } from '../../../Helpers'
interface IOptions {
    upload: (file: File) => Promise<string>
    renderUrl?: (path?: string) => string
    size?: {
        width: number,
        height: number
    }
    preview?: boolean,
    accepts?: string
}

const createUploadImage = function <TModel>(options: IOptions) {
    interface IProps extends IFormInputBase<TModel> {
        sx?: SxProps<Theme>
    }
    interface IUploadImageState {
        isUpload: boolean
        result?: string
        message?: string
    }
    class UploadImage extends Component<IProps, IUploadImageState> {
        /**
         *
         */
        constructor(props: IProps) {
            super(props);
            this.state = {
                isUpload: false,
                result: this.getdefaultValue()
            }
            this.refInput = React.createRef<HTMLInputElement>()
        }
        onChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
            if (!e.currentTarget.files) return
            const file = e.currentTarget.files[0]
            if (!file) return

            let result: string | undefined = this.state.result
            let message: string | undefined

            try {
                this.setState({ isUpload: true })
                const isCheck = options.size ? await this.checkImageSize(file) : true
                if (typeof isCheck === 'string') {
                    message = isCheck
                } else if (isCheck === false) {
                    message = `File size must be ${options.size?.width} x ${options.size?.height}`
                }

                result = await options.upload(file)

            } catch (error) {
                console.log({ error });
                message = "An error has occurred"
            } finally {
                this.setState({ isUpload: false, result: result, message })
                if (this.refInput.current) {
                    this.refInput.current.value = ''
                }
            }
        }
        onUpload = () => {
            this.refInput.current?.click()
        }
        onReset = () => {
            if (this.refInput.current) {
                this.refInput.current.value = ''
            }
            this.setState({ isUpload: false, message: undefined, result: this.getdefaultValue() })
        }
        getImageInfo = (file: File): Promise<{ width: number, height: number }> => {
            const reader = new FileReader();
            return new Promise((res, rej) => {
                const img = new Image();
                reader.onload = function (e) {
                    if (!e.target || !e.target.result) {
                        rej("Error load img!")
                        return
                    }
                    img.src = e.target.result.toString();

                    img.onload = function () {
                        res({ width: img.width, height: img.height })
                    };
                    img.onerror = function () {
                        console.error("Failed to load image.");
                        rej("Failed to load image.")
                    };
                };
                reader.readAsDataURL(file);
            })
        }
        checkImageSize = async (file: File) => {
            if (!options.size) {
                return true
            }
            try {
                const data = await this.getImageInfo(file)
                return data.width === options.size.width && data.height === options.size.height
            } catch (error) {
                return "Failed to load image."
            }
        }
        refInput: React.RefObject<HTMLInputElement>
        render() {
            const imageUrl = options.renderUrl ? options.renderUrl(this.state.result) : ""
            return (
                <Box sx={{ display: 'flex', flexDirection: 'column', border: '2px solid #1976d2', borderRadius: '4px' }} >
                    <input name={this.props.name?.toString()} hidden value={this.state.result} />
                    <input accept={options.accepts ?? "image/*"} ref={this.refInput} hidden type='file' onChange={this.onChange} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
                            <Typography variant='subtitle1'>{this.props.label}</Typography>
                            <Divider sx={{ margin: '10px' }} orientation='vertical' />
                            <Button disabled={this.state.isUpload} onClick={this.onUpload}>Upload</Button>
                            <Button disabled={this.state.isUpload} onClick={this.onReset}>Reset</Button>
                            {options.size ?
                                <>
                                    <Divider sx={{ margin: '10px' }} orientation='vertical' />
                                    <Chip label={`${options.size.width} x ${options.size.height}`} />
                                </> : <></>}
                        </Box>
                        <Box>
                            {this.state.isUpload ? <CircularProgress size={20} /> : <></>}
                        </Box>
                    </Box>
                    <Typography sx={{ textAlign: 'center', width: '100%' }} color='error' variant='caption' >{this.state.message}</Typography>
                    {options.preview !== false ?
                        <Box sx={{
                            backgroundImage: `url(${encodeURI(imageUrl)})`,
                            height: "200px",
                            // width: "100%",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                            backgroundPosition: "center",
                            margin: '5px'
                        }}>
                        </Box>
                        : <Box sx={{ height: '50px', padding: '10px' }}>
                            <Typography>{this.state.result}</Typography>
                        </Box>
                    }
                </Box>
            )
        }
        getdefaultValue = () => this.props.defaultValue ?? (this.props.data as any)?.[this.props.name]
        mapProps = (): Partial<TypographyProps> => {
            const tp: TypographyProps = {}
            const dValue = this.props.defaultValue ?? (this.props.data as any)?.[this.props.name]
            if (dValue) tp.sx = { color: '#606060' }
            else {
                tp.className = 'noselect'
                tp.sx = { color: '#f0f0f0' }
            }
            return MergeObjects({}, tp, { sx: this.props.sx })
        }
    }

    return UploadImage
}
export default createUploadImage
export type TextOnlyType<TModel> = ReturnType<typeof createUploadImage<TModel>>
