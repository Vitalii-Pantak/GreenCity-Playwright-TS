import { tokenPattern } from "./patterns";

export const signInSchema = {
    $id: "SignInSchema",
    type: "object",
    properties: {
        userId: { type: "number" },
        accessToken: { 
			type: "string",
			description: "JWT access token",
			pattern: tokenPattern,
		},
        refreshToken: { 
			type: "string",
			description: "JWT refresh token",
			pattern: tokenPattern,
		},
        name: { type: "string" },
        ownRegistrations: { type: "boolean" },
    },
    required: [ "userId", "accessToken", "refreshToken", "name", "ownRegistrations" ],
    additionalProperties: false,
};

export const updateAccessTokenSchema = {
    $id: "UpdateAccessTokenSchema",
    type: "object",
    properties: {
        accessToken: { 
			type: "string",
			description: "JWT access token",
			pattern: tokenPattern
		},
        refreshToken: { 
			type: "string",
			description: "JWT refresh token",
			pattern: tokenPattern
		},
    },
    required: [ "accessToken", "refreshToken" ],
    additionalProperties: false,
};

export const passwordStatusSchema = {
    $id: "PasswordStatusSchema",
    type: "object",
    properties: {
        hasPassword: { type: "boolean" },
    },
    required: [ "hasPassword" ],
    additionalProperties: false,
};


