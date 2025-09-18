import Axios, { AxiosRequestHeaders } from "axios";

export const HttpService = Axios.create({
    baseURL: "",
});
export const CreateHttpService = (baseURL: string, headers?: AxiosRequestHeaders) => {
    return Axios.create({
        baseURL,
        headers
    });
};