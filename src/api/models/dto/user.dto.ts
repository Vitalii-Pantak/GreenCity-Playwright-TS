export interface SignInDto {
    userId: number,
    accessToken: string,
    refreshToken: string,
    name: string,
    ownRegistrations: boolean
}

export interface UpdateAccessTokenDto {
    accessToken: string,
    refreshToken: string
}

export interface PasswordStatusDto {
    hasPassword: boolean
}