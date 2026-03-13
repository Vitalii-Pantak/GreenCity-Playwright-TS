import { timeDatePattern } from "./patterns";

export const ecoNewsSchema = {
    $id: "EcoNewsSchema",
    type: "object",
    properties: {
        id: { type: "number", format: "int64", minimum: 1 },
        title: { type: "string", minLength: 1 },
        content: { type: "string", minLength: 1 },
        shortInfo: { type: "string", nullable: true },
        author: {
            type: "object",
            properties: {
                id: { type: "number" },
                name: { type: "string" },
            },
            required: ["id", "name"],
            additionalProperties: false,
        },
        creationDate: {
            type: "string",
            pattern: timeDatePattern,
            minLength: 1,
        },
        imagePath: { type: "string" },
        source: { type: "string", nullable: true },
        tagsUk: {
            type: "array",
            items: { type: "string" },
        },
        tagsEn: {
            type: "array",
            items: { type: "string" },
        },
        likes: { type: "number", format: "int32" },
        countComments: { type: "number", format: "int32" },
        countOfEcoNews: { type: "number", format: "int32" },
        favorite: { type: "boolean" },
    },
    required: [ "title", "content", "author", "creationDate",
                "imagePath", "tagsUk", "tagsEn" ],
    additionalProperties: false,
};

export const baseEcoNewsSchema = {
    $id: "BaseEcoNewsSchema",
    type: "object",
    properties: {
        creationDate: { type: "string",
            pattern: timeDatePattern,
        },
        imagePath: { type: "string", minLength: 1 },
        id: { type: "number", format: "int64", minimum: 1 },
        title: { type: "string", minLength: 1 },
        content: { type: "string", minLength: 1 },
        shortInfo: { type: "string" },
        author: {
            type: "object",
            properties: {
                id: { type: "number" },
                name: { type: "string" },
            },
            required: ["id", "name"],
            additionalProperties: false,
        },
        likes: { type: "number", format: "int32" },
        dislikes: { type: "number", format: "int32" },
        countComments: { type: "number", format: "int32" },
        hidden: { type: "boolean" },
        tagsEn: {
            type: "array",
            items: { type: "string" },
            minItems: 1,
        },
        tagsUk: {
            type: "array",
            items: { type: "string" },
            minItems: 1,
        },
    },
    required: [ "creationDate", "imagePath", "id", "title",
                "content", "author", "tagsEn", "tagsUk" ],
    additionalProperties: false,
};
