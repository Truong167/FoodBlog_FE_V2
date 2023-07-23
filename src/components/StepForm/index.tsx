import { Fragment } from "react"
import Section from "../Section/Section"
import { useFieldArray } from "react-hook-form"
import FormItem from "../UI/FormItem"
import AntdUpload from "../UI/Upload"
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons"
import AntdTextArea from "../UI/Input/TextArea"

const StepForm: React.FC<Partial<Recipe.TPropsForm>> = ({ control }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'Steps'
    })
    return (
        <Section>
            <Fragment>
                <h3 className="mb-3">Các bước</h3>
                {fields.map((field, index) => {
                    return (
                        <div key={field.id} className="grid grid-cols-3-custom1 gap-2">
                            <span>{index + 1}</span>
                            <div>
                                <FormItem>
                                    <AntdTextArea
                                        size='large'
                                        autoSize={true}
                                        control={control}
                                        placeholder="Trộn bột và nước đến khi đặc lại"
                                        name={`Steps.${index}.description`}
                                    />
                                </FormItem>
                                <FormItem>
                                    <AntdUpload
                                        listType='picture-card'
                                        control={control}
                                        name={`Steps.${index}.image`}
                                    />
                                </FormItem>
                            </div>
                            <div>
                                <EllipsisOutlined className="text-2xl  cursor-pointer" />
                            </div>
                        </div>
                    )
                })}
                <div className="flex justify-center gap-2 items-center cursor-pointer" onClick={() => append({ name: '', image: [] })}>
                    <PlusOutlined />
                    <span>Bước làm</span>
                </div>
            </Fragment>
        </Section>
    )
}

export default StepForm