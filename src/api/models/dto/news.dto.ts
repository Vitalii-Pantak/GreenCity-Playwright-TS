export interface Author {
    id: number,
    name: string
}

export interface BaseEcoNewsDto {
    creationDate: string,
    imagePath: string,
    id: number,
    title: string,
    content: string,
    shortInfo: string,
    author: Author,
    likes: number,
    dislikes: number,
    countComments: number,
    hidden: boolean,
    tagsEn: string[],
    tagsUk: string[]
}

export interface TagDto {
    id: number;
    name: string;
    languageCode: string | null;
}

export interface NewsSummaryDto {
    content: string,
    source: string
}


export interface EcoNewsDto {
    id: number,
    title: string,
    content: string,
    shortInfo: string | null,
    author: Author,
    creationDate: string,
    imagePath: string,
    source: string | null,
    tagsUk: string[],
    tagsEn: string[],
    likes: number,
    countComments: number,
    countOfEcoNews: number,
    favorite: boolean
}

export interface NewsPagesDto {
    page: EcoNewsDto[],
    totalElements: number,
    currentPage: number,
    totalPages: number,
    number: number,
    hasPrevious: boolean,
    hasNext: boolean,
    first: boolean,
    last: boolean
}