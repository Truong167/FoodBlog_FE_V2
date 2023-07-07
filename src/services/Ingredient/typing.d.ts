
declare namespace INGREDIENT {
    type LoginParams = {
        accountName?: string,
        password?: string
    }

    type LoginResult = {
        data?: object,
        status?: number
    }

    type TDetailIngredientItem = {
        ingredientId: string, 
        amount: string, 
        name: string
    }

    type TDetailIngredientList = {
        DetailIngredients: IngredientItem[]
    }
}