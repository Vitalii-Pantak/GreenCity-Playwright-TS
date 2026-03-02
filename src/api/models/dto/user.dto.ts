export interface SignInDto {
    userId: number,
    accessToken: string,
    refreshToken: string,
    name: string,
    ownRegistrations: boolean
    woof: string
}

export interface UpdateAccessTokenDto {
    accessToken: string,
    refreshToken: string
}

export interface PasswordStatusDto {
    hasPassword: boolean
}