export interface EcoNewsDto {
    title: string;
    text: string;
    shortInfo?: string;
    source?: string;
    tags: string[];
}


export interface UpdateEcoNewsDto  {
    id: number;
    content: string;
    title?: string;
    text?: string;
    shortInfo?: string;
    source?: string;
    tags: string[];
}