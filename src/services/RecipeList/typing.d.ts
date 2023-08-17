
declare namespace Recipe_List {

    type TCreateRecipeToBookMarkParams = {
        recipeListDetail: {recipeListId: number, isBookmarked: boolean, name: string}[]
    }

    type TRecipeListResponse = {
        recipeListId: number
        name: string
        image: string
    }

    type TCreateRecipeList = {
        name?: string
    }
}