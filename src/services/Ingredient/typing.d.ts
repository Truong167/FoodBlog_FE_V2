
declare namespace INGREDIENT {
    type LoginParams = {
        accountName?: string,
        password?: string
    }

    type LoginResult = {
        data?: object,
        status?: number
    }
}