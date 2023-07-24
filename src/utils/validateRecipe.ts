import { number, object, string, array, mixed } from "yup";
import { REGEX_NUMBER } from "../contants/regex";

const validateIngredient = {
    amount: number()
    .required('Vui lòng nhập số lượng')
    .min(1, 'Giá trị tối thiểu là 1')
    .typeError('Số lượng chỉ nhận số')
}

const validateStep = {
    description: string().required('Vui lòng nhập mô tả')
}

export const validateRecipe = object({
    recipeName: string().required('Vui lòng nhập tên công thức'),
    amount: number()
    .required('Vui lòng nhập khẩu phần ăn')
    .min(1, 'Số khẩu phần ăn tối thiểu là 1')
    .max(10, 'Số khẩu phần ăn tối đa là 10')
    .typeError('Số khẩu phần ăn chỉ nhận số'),
    preparationTime: number()
    .required('Vui lòng nhập thời gian chuẩn bị')
    .min(1, 'Thời gian chuẩn bị tối thiểu là 1 phút')
    .typeError('Số khẩu phần ăn chỉ nhận số'),
    cookingTime: number()
    .required('Vui lòng nhập thời gian nấu nướng')
    .min(5, 'Thời gian nấu ăn tối thiểu là 5 phút')
    .typeError('Số khẩu phần ăn chỉ nhận số'),
    video: mixed()
    .test('file', 'Vui lòng chọn video', (value: any) => {
        if(value && value.length > 0) {
            return true
        }
        return false
    }),
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