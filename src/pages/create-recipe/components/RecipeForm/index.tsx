
import React from "react"
import Section from "../../../../components/Section/Section"
import InputText from "../../../../components/UI/Input/Input"
import AntdTextArea from "../../../../components/UI/Input/TextArea"
import FormItem from "../../../../components/UI/FormItem"
import AntdSelect from "../../../../components/UI/Select"
import { PRIVACY } from "../../../../contants/data"

const RecipeForm: React.FC<Partial<Recipe.TPropsForm>> = ({ control, error }) => {
    return (
        <Section>
            <div>
                <FormItem className="mb-3">
                    <InputText
                        control={control}
                        placeholder='Tên món: Beafsteak ngon nhất nhà mình'
                        name="recipeName"
                        error={error}
                    />
                </FormItem>
                <FormItem>
                    <AntdTextArea
                        autoSize={true}
                        name="description"
                        control={control}
                        placeholder="Hãy chia sẻ với mọi người về món này của bạn nhé - ai đã truyền cảm hứng cho bạn, tại sao nó đặc biệt, bạn thích thưởng thức nó thế nào?"
                        error={error}
                    />
                </FormItem>
                <div className='grid grid-cols-2'>
                    <p style={{ color: '#606060' }}>Khẩu phần</p>
                    <FormItem>
                        <InputText
                            control={control}
                            name="amount"
                            placeholder='2 phần ăn'

                            error={error}
                        />
                    </FormItem>
                </div>
                <div className='grid grid-cols-2'>
                    <p style={{ color: '#606060' }}>Thời gian chuẩn bị</p>
                    <FormItem>
                        <InputText
                            control={control}
                            placeholder='10 phút'
                            name="preparationTime"
                            error={error}
                        />
                    </FormItem>
                </div>
                <div className='grid grid-cols-2'>
                    <p style={{ color: '#606060' }}>Thời gian nấu</p>
                    <FormItem>
                        <InputText
                            control={control}
                            placeholder='10 phút'
                            name="cookingTime"
                            error={error}
                        />
                    </FormItem>
                </div>
                <div className='grid grid-cols-2'>
                    <p style={{ color: '#606060' }}>Quyền riêng tư</p>
                    <FormItem>
                        <AntdSelect
                            control={control}
                            name="status"
                            values={PRIVACY}
                            defaultValue={PRIVACY[0].name}
                        />
                    </FormItem>
                </div>
            </div>
        </Section>
    )
}

export default RecipeForm
