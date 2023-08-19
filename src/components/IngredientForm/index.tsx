import { PlusOutlined, RestOutlined } from "@ant-design/icons"
import FormItem from "../UI/FormItem"
import InputText from "../UI/Input/Input"
import Section from "../Section/Section"
import { Fragment } from "react"
import { useFieldArray } from "react-hook-form"
import AntdSelect from "../UI/Select"
import { UNIT_OF_INGREDIENT } from "../../contants/data"
import { useGetALlIngredient } from "../../services/Ingredient/service"

const IngredientForm: React.FC<Partial<Recipe.TPropsForm>> = ({ control }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "DetailIngredients",
    });

    const {data} = useGetALlIngredient()
    return (
        <Section>
            <Fragment>
                <h3 className='mb-3'>Nguyên liệu</h3>
                <div className="grid grid-cols-4-custom max-sm:grid-cols-4-custom1 gap-2">
                    {fields.map((field, index) => {
                        return (
                            <Fragment key={field.id}>
                                <FormItem className="mb-3">
                                    {data && 
                                        <AntdSelect
                                        showSearch={true}
                                        defaultValue="trungga"
                                        values={data}
                                        size='large'
                                        control={control}
                                        name={`DetailIngredients.${index}.ingredientId`}
                                    />
                                    }
                                </FormItem>
                                <FormItem className="mb-3">
                                    <InputText
                                        size='large'
                                        control={control}
                                        placeholder="2"
                                        name={`DetailIngredients.${index}.amount`}
                                    />
                                </FormItem>
                                <FormItem className="mb-3">
                                    <AntdSelect
                                        showSearch={true}
                                        defaultValue="Gram"
                                        size='large'
                                        control={control}
                                        values={UNIT_OF_INGREDIENT}
                                        name={`DetailIngredients.${index}.unit`}
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
                    <div className="flex gap-2 items-center cursor-pointer" onClick={() => append({ingredientId: 'trungga', amount: '', unit: 'Gram'})}>
                        <PlusOutlined />
                        <span>Nguyên liệu</span>
                    </div>
                </div>
            </Fragment>
        </Section>
    )
}

export default IngredientForm