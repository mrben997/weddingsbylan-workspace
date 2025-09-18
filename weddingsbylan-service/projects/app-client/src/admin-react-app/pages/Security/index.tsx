import { Box, FormControl, Paper, styled, TextField, Typography } from '@mui/material'
import React, { Component } from 'react'
import PasswordIcon from '@mui/icons-material/Password';
import FormInfo from './form';
import { IChangePassword } from '@/admin-react-app/model';
import { Sleep } from '@/modules/Library/Helpers';
import { serviceUser } from '@/admin-react-app/services/service.user';
import { getTranslation } from '@/locales/helper';
import { getLocale } from '@/admin-react-app/ultilities/helper';

const language = getTranslation(getLocale())

export default class Security extends Component {
    onChangePasswordSubmit = async (value: Partial<IChangePassword>) => {
        await serviceUser.ChanngePassword(value)
    }
    render() {
        return (
            <Box sx={{ padding: '5px', display: 'flex', flex: 1, flexDirection: 'column' }}>
                <Block>
                    <BlockTitle>
                        <PasswordIcon />
                        <Typography variant='h6'>{language.FormChangePassword}</Typography>
                    </BlockTitle>
                    <FormInfo onSubmit={this.onChangePasswordSubmit} />
                </Block>
            </Box>
        )
    }
}

const Block = styled(Paper)({
    width: '100%',
    display: 'flex',
    height: 'auto',
    flexDirection: 'column',
    padding: '5px',
    maxWidth: '600px'
})
const BlockTitle = styled(Box)({
    display: 'flex', alignItems: 'center',
    color: '#1976d2',
    gap: '3px'
})