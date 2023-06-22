
declare namespace API_AUTH {
    type LoginParams = {
        accountName?: string,
        password?: string
    }

    type LoginResult = {
        data?: object,
        status?: number
    }
}