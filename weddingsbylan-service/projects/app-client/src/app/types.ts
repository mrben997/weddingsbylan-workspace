export interface ISearchParams {
    locale?: string; // Tham số 'para' có thể là chuỗi hoặc không tồn tại
    page?: string
}

export interface IPageProps {
    searchParams: ISearchParams; // Sử dụng kiểu vừa định nghĩa
    params: Promise<{ locale: string }>; // Tham số 'params' có thể là chuỗi hoặc không tồn tại
}
