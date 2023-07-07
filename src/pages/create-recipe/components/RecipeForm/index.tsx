
import React from "react"
import Section from "../../../../components/Section/Section"
import InputText from "../../../../components/UI/Input/Input"
import AntdTextArea from "../../../../components/UI/Input/TextArea"
import FormItem from "../../../../components/UI/FormItem"

const RecipeForm: React.FC<Partial<Recipe.TPropsForm>> = ({control, error}) => {
    return (
        <Section>
            <div>
                <FormItem>
                    <InputText control={control} placeholder='Tên món: Beafsteak ngon nhất nhà mình' name="recipeName" error={error}/>
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
                <div>
                    
                </div>
            </div>
        </Section>
    )
}

export default RecipeForm
