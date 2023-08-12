import { HeartOutlined, SendOutlined } from "@ant-design/icons"
import FormItem from "../../../../components/UI/FormItem"
import InputText from "../../../../components/UI/Input/Input"
import EmojiPicker from "emoji-picker-react"
import useSubmitComment from "./hooks/useSubmit"
import { Form, Popover } from "antd"
import { Fragment } from "react"
import { useUser } from "../../../../services/Auth/service"
import { imageUrl } from "../../../../contants/constant"

type TCommentFormProps = {
    recipeId: string;
}

const CommentForm: React.FC<TCommentFormProps> = ({ recipeId }) => {
    const { control, onEmojiClick, handleSubmit, onSubmit } = useSubmitComment(recipeId)
    const { data } = useUser()
    console.log(data)
    const [form] = Form.useForm()
    return (
        <Form form={form} onFinish={handleSubmit(onSubmit)}>
            <FormItem>
                <div className="flex items-center gap-1">
                    <div className="h-[40px] w-[40px]">
                        {data && <img src={`${data.avatar}`} className="h-full w-full object-cover rounded-full" alt={data.avatar}/>}
                    </div>
                    <InputText
                        placeholder="Bình luận của bạn"
                        autoComplete="off"
                        control={control}
                        name="comment"
                        size='large'
                        suffix={
                            <Fragment>
                                <Popover zIndex={1} trigger="click" content={<EmojiPicker onEmojiClick={onEmojiClick} />} title="Title">
                                    <HeartOutlined className="text-xl cursor-pointer" />
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