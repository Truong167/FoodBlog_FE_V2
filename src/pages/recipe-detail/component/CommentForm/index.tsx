import { CommentOutlined, EllipsisOutlined, SendOutlined, SmileOutlined } from "@ant-design/icons"
import FormItem from "../../../../components/UI/FormItem"
import InputText from "../../../../components/UI/Input/Input"
import EmojiPicker from "emoji-picker-react"
import useSubmitComment from "./hooks/useSubmit"
import { Avatar, Dropdown, Form, MenuProps, Popover } from "antd"
import { Fragment, useState } from "react"
import { useUser } from "../../../../services/Auth/service"
import no_avatar from '../../../../assets/images/no_avatar.png'
import Meta from "antd/es/card/Meta"
import { formatDate } from "../../../../utils/format-time"
import ModalDelete from "./ModalDelete"

type TCommentFormProps = {
    recipeId: string;
    commentId?: string
    comments?: any
}


const CommentForm: React.FC<TCommentFormProps> = ({ recipeId, comments }) => {
    const [commentId, setCommentId] = useState<string>('')
    const [type, setType] = useState<string>('create')
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const { control, onEmojiClick, handleSubmit, onSubmit, setValue, handleConfirm, deleteCommentLoading, setFocus } = useSubmitComment(recipeId, commentId, type, setIsDeleteModalOpen, setType)
    const handleActionComment = (e: any, commentId: number, comment: string) => {
        setCommentId(commentId.toString())
        if (e.key === 'edit') {
            setType('update')
            setValue('comment', comment)
            setFocus('comment')
        }
    }
    const items: MenuProps['items'] = [
        {
            key: 'delete',
            label: (
                <p onClick={() => setIsDeleteModalOpen(true)}>Xóa bình luận</p>
            ),
        },
        {
            key: 'edit',
            label: (
                <p>
                    Chỉnh sửa bình luận
                </p>
            ),
        },
    ];
    const [form] = Form.useForm()
    return (
        <Fragment>
            <div className="flex items-center gap-x-2 mb-3">
                <CommentOutlined className="text-2xl" />
                <h3>Tất cả bình luận</h3>
            </div>
            <h6>Tất cả tương tác {comments && `(${comments.commentCount})`}</h6>
            <div className="mt-3 h-[200px] overflow-x-hidden mb-3 custom-scrollbar">
                {comments && comments.comment.length > 0 ? (
                    comments.comment.map((item: any) => {
                        return (
                            <div className="flex" key={item.commentId}>
                                <Meta
                                    className="flex gap-4 mb-4 w-full"
                                    avatar={<Avatar className="h-12 w-12" src={`${item.User.avatar
                                        ? item.User.avatar
                                        : no_avatar
                                        }`} />}
                                    title={<h6>{item.User.fullName + " " + formatDate(item.date)}</h6>}
                                    description={item.comment}
                                />
                                {item.isMyComment &&
                                    <Dropdown menu={{
                                        items,
                                        onClick: (e) => handleActionComment(e, item.commentId, item.comment)
                                    }}
                                    >
                                        <EllipsisOutlined className="text-2xl h-[24px] cursor-pointer" />
                                    </Dropdown>
                                }
                            </div>
                        );
                    })
                ) : (
                    <h3>Chưa có bình luận nào</h3>
                )}
            </div>
            <Form form={form} onFinish={handleSubmit(onSubmit)}>
                <FormItem>
                    <div className="flex items-center gap-1">
                        <InputText
                            placeholder="Bình luận của bạn"
                            autoComplete="off"
                            control={control}
                            name="comment"
                            size='large'
                            suffix={
                                <Fragment>
                                    <Popover zIndex={1} trigger="click" content={<EmojiPicker width='100%' onEmojiClick={onEmojiClick} />} title="Title">
                                        <SmileOutlined className="text-xl cursor-pointer" />
                                    </Popover>
                                    <SendOutlined className="ml-2 text-xl cursor-pointer" onClick={() => form.submit()} />
                                </Fragment>
                            }
                        />
                    </div>
                </FormItem>
            </Form>
            <ModalDelete
                isLoading={deleteCommentLoading}
                isDeleteModalOpen={isDeleteModalOpen}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                handleConfirm={handleConfirm}
            />
        </Fragment>
    )
}

export default CommentForm