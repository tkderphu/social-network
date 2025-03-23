
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

export const setState = (event: any, fn: any) => {
    const {name, value} = event.target
    fn((prev: any) => ({
        ...prev,
        [name]: value
    }))
}