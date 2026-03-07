export interface CreateEcoNewsModel {
    title: string;
    text: string;
    shortInfo?: string;
    source?: string;
    tags: string[];
    imagePath?: string,
    expectedStatus?: number,
}

export interface UpdateEcoNewsModel  {
    id: number;
    content: string;
    title?: string;
    shortInfo?: string;
    source?: string;
    tags: string[];
    imagePath?: string,
    expectedStatus?: number,
}

export interface IdAndStatus {
    id: number,
    expectedStatus?: number,
}