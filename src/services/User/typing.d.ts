
declare namespace AUTH {
    type TLoginParams = {
        accountName: string,
        password: string
    }

    type TLoginResult = {
        data?: { success: boolean, message: string, data: string },
        status?: number
    }

    type TRegisterParams = {
        fullName: string,
        email: string,
        accountName: string,
        password: string
        password2: string
    }
}