export interface AddComment {
    newsId: number,
    text: string,
    parrentId?: number,
    expectedStatus?: number,
}


export interface UpdateComment {
    id: number,
    text: string,
    expectedStatus?: number,
}