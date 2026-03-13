import { timeDatePattern } from "./patterns";

export const addCommentSchema = {
    $id: "AddCommentSchema",
    type: "object",
    properties: {
        id: { type: "number", format: "int64", minimum: 1 },
        author: {
            type: "object",
            properties: {
                id: { type: "number", format: "int64" },
                name: { type: "string", minLength: 1 },
                profilePicturePath: {
                    type: "string",
                    minLength: 1,
                    nullable: true,
                },
            },
            required: ["id", "name", "profilePicturePath"],
            additionalProperties: false,
        },
        text: { type: "string", minLength: 1 },
        createdDate: {
            type: "string",
            pattern: timeDatePattern,
        },
        additionalImages: {
            type: "array",
            items: { type: "string" },
        },
    },
    required: ["id", "author", "text"],
    additionalProperties: false,
};

export const commentSchema = {
    $id: "CommentSchema",
    type: "object",
    properties: {
        id: { type: "number", format: "int64", minimum: 1 },
        createdDate: {
            type: "string",
            pattern: timeDatePattern,
        },
        modifiedDate: {
            type: "string",
            pattern: timeDatePattern,
        },
        author: {
            type: "object",
            properties: {
                id: { type: "number" },
                name: { type: "string" },
                profilePicturePath: { type: "string", nullable: true },
            },
            required: ["id", "name", "profilePicturePath"],
            additionalProperties: false,
        },
        parentCommentId: { type: "number", nullable: true, format: "int64" },
        text: { type: "string" },
        replies: { type: "number", format: "int32" },
        likes: { type: "number", format: "int32" },
        dislikes: { type: "number", format: "int32" },
        currentUserLiked: { type: "boolean" },
        currentUserDisliked: { type: "boolean" },
        status: { type: "string", nullable: true },
        additionalImages: {
            type: "array",
            items: { type: "string" },
        },
    },
    required: ["id", "createdDate", "modifiedDate"],
    additionalProperties: false,
};
