import { AxiosError } from 'axios'
// import { ApiAlertContext } from 'local-lib/Views'
export const ProcessRepose = async (err: AxiosError) => {
    if (err.response?.status === 403) {
        const dataError: { Code: number; Message: string } = err.response.data as any
    } else if (err.response?.status === 401) {
    } else if (err.code === 'ERR_CANCELED') {
    }
    return Promise.reject(err)
}