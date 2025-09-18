export const NEW_PAGE_SIZE = 9

export const getTotalPages = (size: number, pageSize: number) => {

    return Math.floor(size / pageSize) + ((size % NEW_PAGE_SIZE) > 0 ? 1 : 0)
}