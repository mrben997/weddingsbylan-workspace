import React, { useState } from 'react';
import './index.css'
import { Box, Button, Divider, FormControl, FormHelperText, IconButton, InputAdornment, TextField } from '@mui/material';
import { ConvertFormDataToJson } from '@/modules/Library/Forms';
import { authenticationService } from '@/admin-react-app/services/service.authentitcation';
import { FetchDelay, Sleep } from '@/modules/Library/Helpers';
import HttpsIcon from '@mui/icons-material/Https';
import { checkAuth } from '@/admin-react-app/layout/auth.helper';
import PersonIcon from '@mui/icons-material/Person';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { ArrowLeft, Visibility, VisibilityOff } from '@mui/icons-material';
interface ILoginModel {
    username: string
    password: string
}
interface IModelError {
    all?: string
    username?: string
    password?: string
}
export default function Login() {
    const [isLoading, setIsLoading] = useState(false)
    const [ModelError, setModelError] = useState<IModelError>()
    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        const modelError: IModelError = {}
        let result = false
        try {
            const form = new FormData(e.currentTarget)
            const model = ConvertFormDataToJson<ILoginModel>(form)
            if (!model.username) {
                modelError.username = "The username is required."
            }
            if (!model.password) {
                modelError.password = "The password is required."
            }
            if (!model.username || !model.password) {
                return
            }
            setIsLoading(true)
            result = await FetchDelay(() => authenticationService.login(model.username ?? '', model.password ?? ''), 500)
            if (result) {
                checkAuth()
                return
            } else {
                modelError.all = 'Login failed, please check your username/password again.'
            }
            // await Sleep(2000)
        } catch (error) {
            modelError.all = 'Login failed, please check your username/password again.'
        } finally {
            setModelError(modelError)
            if (!result) {
                setIsLoading(false)
            }
        }
    }
    const onChangeText = (type: "U" | "P", value: string) => {
        if (type === 'U') {
            const message = value ? "" : "The username is required"
            setModelError({ ...ModelError, username: message })
        } else if (type === 'P') {
            const message = value ? "" : "The password is required"
            setModelError({ ...ModelError, password: message })
        }
    }
    return (
        <Box className={'login-body'} sx={{
            width: '100vw', height: '100vh',
        }}>
            <Box className="login-page" sx={{ opacity: isLoading ? 0.7 : 1, pointerEvents: isLoading ? 'none' : 'auto' }}>
                <div className="form">
                    <Box sx={{ padding: '10px', width: '100%' }} component={'img'} width={300} src="/public/images/logonds-3.png" className="logo" alt="" />
                    <Box component={'form'}
                        className="login-form" onSubmit={onSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', gap: '5px', margin: 0 }}
                    >
                        <FormControl fullWidth>
                            <TextField
                                onBlur={(e) => onChangeText("U", e.currentTarget.value)}
                                error={!!ModelError?.username} helperText={ModelError?.username} slotProps={{
                                    input: {
                                        startAdornment: <PersonIcon sx={{ marginRight: '5px', color: 'green' }} />
                                    }
                                }} name='username' placeholder="john@gmail.com" variant='outlined' />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                onBlur={(e) => onChangeText("P", e.currentTarget.value)}
                                error={!!ModelError?.password} helperText={ModelError?.password} slotProps={{
                                    input: {
                                        startAdornment: <VpnKeyIcon sx={{ marginRight: '5px', color: 'green' }} />,
                                        endAdornment: <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                }} name='password' type={showPassword ? "text" : 'password'} placeholder="Enter password!" variant='outlined' />
                        </FormControl>
                        <FormHelperText error={!!ModelError?.all}>{ModelError?.all}</FormHelperText>
                        <Button type='submit' startIcon={<HttpsIcon />}>login</Button>
                        <Divider orientation='horizontal' sx={{ margin: '10px' }} />
                        <Button component={'a'} href='/' variant='text' >← Go Home</Button>
                    </Box>
                </div>
            </Box>
        </Box>

    );
}
