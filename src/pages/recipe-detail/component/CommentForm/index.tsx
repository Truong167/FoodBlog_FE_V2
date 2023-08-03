import { HeartOutlined, SendOutlined } from "@ant-design/icons"
import FormItem from "../../../../components/UI/FormItem"
import InputText from "../../../../components/UI/Input/Input"
import EmojiPicker from "emoji-picker-react"
import useSubmitComment from "./hooks/useSubmit"
import { Form, Popover } from "antd"
import { Fragment } from "react"

type TCommentFormProps = {
    recipeId: string;
}

const CommentForm: React.FC<TCommentFormProps> = ({ recipeId }) => {
    const { control, onEmojiClick, handleSubmit, onSubmit } = useSubmitComment(recipeId)
    const [form] = Form.useForm()
    return (
        <Form form={form} onFinish={handleSubmit(onSubmit)}>
            <FormItem>
                <div>
                    <InputText
                        placeholder="Bình luận của bạn"
                        autoComplete="off"
                        control={control}
                        name="comment"
                        size='large'
                        suffix={
                            <Fragment>
                                <Popover trigger="click" content={<EmojiPicker onEmojiClick={onEmojiClick} />} title="Title">
                                    <HeartOutlined className="text-xl cursor-pointer"/>
                                </Popover>
                                <SendOutlined className="ml-2 text-xl cursor-pointer" onClick={() => form.submit()} />
                            </Fragment>
                        }
                    />
                </div>
            </FormItem>
        </Form>
    )
}

export default CommentForm