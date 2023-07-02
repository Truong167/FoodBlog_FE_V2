
declare namespace Recipe {
    type RecipeResponse = {
        DetailLists: []
        User: UserResponse
        date: string
        image: string
        isFavorite: boolean
        numberOfLikes: number
        recipeId: number
        recipeName: string
        status: string
    }

    type LoginResult = {
        data?: object,
        status?: number
    }

    type UserResponse = {
        avatar: string
        fullName: string
        isFollow: boolean
        userId: number
    }
}