
declare namespace AUTH {
    type TLoginParams = {
        accountName: string,
        password: string
    }

    type TChangePasswordParams = {
        oldPassword: string,
        newPassword: string,
        checkPassword: string,
    }

    type TLoginResult = {
        message: any
        error: any
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

    type TUser = {
        address?: string
        avatar?: any
        dateOfBirth: string | undefined
        email: string
        fullName: string
        introduce?: string
        userId: number
        dateUpdatedRecipe: string
    }
}