export interface AddComment {
    newsId: number,
    text: string,
    parrentId?: number,
    imagePath?: string,
    expectedStatus?: number,
}


export interface UpdateComment {
    id: number,
    text: string,
    expectedStatus?: number,
}