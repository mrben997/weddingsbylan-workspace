import { Sleep } from '@/services/crud.service'
import { Box, CircularProgress, FormControlLabel, Stack, Switch, Typography } from '@mui/material'
import React, { FC, useCallback, useState } from 'react'
interface ISwitchLazyProps {
    onChange?: (value: boolean) => Promise<void>
    defaultChecked?: boolean
}
const SwitchLazy: FC<ISwitchLazyProps> = (props) => {
    const [value, setValue] = useState(props.defaultChecked ?? false)
    const [loading, setLoading] = useState(false)
    const onChange = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            if (props.onChange) {
                try {
                    setLoading(true)
                    await props.onChange(event.target.checked)
                    setValue(!event.target.checked)
                } catch (error) {
                } finally {
                    setLoading(false)
                }
            }
        },
        [props.onChange],
    )
    const getLabel = () => {
        if (loading) {
            return <CircularProgress size={10} />
        }
        return <Typography>{value ? 'Active' : "InActive"}</Typography>
    }
    return (<Box>
        <FormControlLabel
            control={<Switch disabled={loading} checked={value} onChange={onChange} color='success' />}
            label={getLabel()}>
        </FormControlLabel>
    </Box>)
}

export default SwitchLazy
