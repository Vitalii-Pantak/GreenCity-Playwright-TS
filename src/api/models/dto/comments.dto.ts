import { Author } from "./news.dto";

interface AuthorWithProfile extends Author { 
    profilePicturePath: string | null
}

export interface CommentDto {
    id: number,
    createdDate: string,
    modifiedDate: string,
    author: AuthorWithProfile,
    parentCommentId: number | null,
    text: string,
    replies: number,
    likes: number,
    dislikes: number,
    currentUserLiked: boolean,
    currentUserDisliked: boolean,
    status: string | null,
    additionalImages: string[]
}

export interface CommentsListDto {
    page: CommentDto[],
    totalElements: number,
    currentPage: number,
    totalPages: number
}

export interface AddCommentDto { 
    id: number,
    author: AuthorWithProfile,
    text: string,
    createdDate: string,
    additionalImages: string[]
}