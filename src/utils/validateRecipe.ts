import { number, object, string, array, mixed } from "yup";
import ERROR_CODE from "../contants/error-code";

const validateIngredient = {
    amount: number()
    .required(ERROR_CODE.AMOUNT_INGREDIENT_BLANK_ERROR)
    .min(1, 'Giá trị tối thiểu là 1')
    .typeError(ERROR_CODE.AMOUNT_NUMBER_ERROR)
}

const validateStep = {
    description: string()
    .required(ERROR_CODE.DESCRIPTION_BLANK_ERROR)
    .transform(value => {
        return value.replace(/\s+/g, " ")
    })
}

export const validateRecipe = object({
    recipeName: string()
    .required(ERROR_CODE.RECIPE_NAME_BLANK_ERROR)
    .transform(value => {
        return value.replace(/\s+/g, " ")
    }),
    description: string()
    .transform(value => {
        if(!value){
            return
        }
        return value.replace(/\s+/g, " ")
    }),
    amount: number()
    .required(ERROR_CODE.ACCOUNT_BLANK_ERROR)
    .min(1, 'Số khẩu phần ăn tối thiểu là 1')
    .max(10, 'Số khẩu phần ăn tối đa là 10')
    .typeError(ERROR_CODE.AMOUNT_NUMBER_ERROR),
    preparationTime: number()
    .required(ERROR_CODE.PREPARATION_TIME_BLANK_ERROR)
    .min(1, 'Thời gian chuẩn bị tối thiểu là 1 phút')
    .typeError(ERROR_CODE.PREPARATION_TIME_NUMBER_ERROR),
    cookingTime: number()
    .required(ERROR_CODE.COOKING_TIME_BLANK_ERROR)
    .min(5, 'Thời gian nấu ăn tối thiểu là 5 phút')
    .typeError(ERROR_CODE.COOKING_TIME_NUMBER_ERROR),
    image: mixed()
    .test('file', 'Vui lòng chọn hình', (value: any) => {
        if(value && value.length > 0) {
            return true
        }
        return false
    }),
    DetailIngredients: array().of(object().shape(validateIngredient)).required(),
    Steps: array().of(object().shape(validateStep)).required()
})