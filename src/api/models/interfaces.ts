export interface FindNewsParams {
    title?: string,
    tags?: string[],
    authorID?: number,
    favorite?: boolean,
    page?: number,
    size?: number,
    sort?: string[]

    [key: string]: string | number | boolean | string[] | undefined;
}