
export interface CommonResult<T> {
    code: number
    message: string
    data: T
}

export interface PageResult<T> {
    page: number
    limit: number
    data: Array<T>
}