import { PlusOutlined, RestOutlined } from "@ant-design/icons"
import FormItem from "../../../../components/UI/FormItem"
import InputText from "../../../../components/UI/Input/Input"
import Section from "../../../../components/Section/Section"
import { Fragment } from "react"
import { useFieldArray } from "react-hook-form"

const IngredientForm: React.FC<Partial<Recipe.TPropsForm>> = ({ control, error }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredients",
    });
    return (
        <Section>
            <Fragment>
                <h3 className='mb-3'>Nguyên liệu</h3>
                <div className="grid grid-cols-3-custom gap-2">
                    {fields.map((field, index) => {
                        return (
                            <Fragment key={field.id}>
                                <FormItem className="mb-3">
                                    <InputText
                                        control={control}
                                        error={error}
                                        placeholder="Trứng gà"
                                        name={`ingredients.${index}.name`}
                                    />
                                </FormItem>
                                <FormItem className="mb-3">
                                    <InputText
                                        control={control}
                                        error={error}
                                        placeholder="2 quả"
                                        name={`ingredients.${index}.amount`}
                                    />
                                </FormItem>
                                <div>
                                    <RestOutlined className="text-xl cursor-pointer" onClick={() => remove(index)}/>
                                </div>
                            </Fragment>
                        )
                    })}
                </div>
                <div className="flex justify-center">
                    <div className="flex gap-2 items-center cursor-pointer" onClick={() => append({name: '', amount: ''})}>
                        <PlusOutlined />
                        <span>Nguyên liệu</span>
                    </div>
                </div>
            </Fragment>
        </Section>
    )
}

export default IngredientForm