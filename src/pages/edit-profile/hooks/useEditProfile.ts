import { SubmitHandler, useForm } from "react-hook-form";
import { imageUrl } from "../../../utils/constant";


export const useEditProfile = (data: any) => {
    console.log(data)
    const { control, handleSubmit } = useForm({
        defaultValues: {
            ...data,
            avatar: data.avatar ? [{url: `${imageUrl + data.avatar}`}] : null
        }
    })

    const onSubmit: SubmitHandler<any> = (values) => {
        console.log(values)
    };

    return {control, handleSubmit, onSubmit}
}