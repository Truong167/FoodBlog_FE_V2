
import React, { Fragment } from "react"
import Section from "../Section/Section"
import InputText from "../UI/Input/Input"
import AntdTextArea from "../UI/Input/TextArea"
import FormItem from "../UI/FormItem"
import AntdSelect from "../UI/Select"
import { PRIVACY } from "../../contants/data"
import AntdUpload from "../UI/Upload"

const RecipeForm: React.FC<Partial<Recipe.TPropsForm>> = ({ control }) => {
    return (
        <Section>
            <div>
                <FormItem className="mb-3">
                    <InputText
                        size='large'
                        control={control}
                        placeholder='Tên món: Beafsteak ngon nhất nhà mình'
                        name="recipeName"
                    />
                </FormItem>
                <FormItem>
                    <AntdTextArea
                        size='large'
                        autoSize={true}
                        name="description"
                        control={control}
                        placeholder="Hãy chia sẻ với mọi người về món này của bạn nhé - ai đã truyền cảm hứng cho bạn, tại sao nó đặc biệt, bạn thích thưởng thức nó thế nào?"
                    />
                </FormItem>
                <FormItem>
                    <Fragment>
                        <p className="text-neutral-2 mb-3">Hình ảnh cho công thức của bạn</p>
                        <AntdUpload
                            className='upload-select w-full'
                            listType='picture-card'
                            control={control}
                            name='image'
                        />
                    </Fragment>
                </FormItem>
                <div className='grid grid-cols-2'>
                    <p className="text-neutral-2">Khẩu phần</p>
                    <FormItem>
                        <InputText
                            control={control}
                            name="amount"
                            placeholder='2'
                            size='large'
                        />
                    </FormItem>
                </div>
                <div className='grid grid-cols-2'>
                    <p className="text-neutral-2">Thời gian chuẩn bị</p>
                    <FormItem>
                        <InputText
                            control={control}
                            placeholder='10'
                            name="preparationTime"
                            size='large'
                        />
                    </FormItem>
                </div>
                <div className='grid grid-cols-2'>
                    <p className="text-neutral-2">Thời gian nấu</p>
                    <FormItem>
                        <InputText
                            control={control}
                            placeholder='10'
                            name="cookingTime"
                            size='large'
                        />
                    </FormItem>
                </div>
                <div className='grid grid-cols-2'>
                    <p className="text-neutral-2">Quyền riêng tư</p>
                    <FormItem>
                        <AntdSelect
                            showSearch={false}
                            defaultValue='CK'
                            control={control}
                            name="status"
                            values={PRIVACY}
                            size='large'
                        />
                    </FormItem>
                </div>
            </div>
        </Section>
    )
}

export default RecipeForm
