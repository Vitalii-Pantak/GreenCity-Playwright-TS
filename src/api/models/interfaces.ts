export interface FindNewsParams {
    title?: string,
    tags?: string[],
    "author-id"?: number,
    favorite?: boolean,
    page?: number,
    size?: number,
    sort?: string[]
    expectedStatus?: number

    [key: string]: string | number | boolean | string[] | undefined;
}

export interface RequestParams {
    url?: string,
    options?: any
}

export interface FindByRelevantParams {
    tags?: string[],
    title?: string,
    author?: string,
    pageIndex?: number,
    size?: number
    expectedStatus?: number
}
