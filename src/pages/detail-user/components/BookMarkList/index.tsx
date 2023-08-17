import { Button, Collapse, Empty, Form, Skeleton } from "antd"
import DetailBookMark from "../DetailBookMark"
import InputText from "../../../../components/UI/Input/Input"
import useBookmarkList from "./hooks/useBookmarkList"
import FormItem from "../../../../components/UI/FormItem"

const { Panel } = Collapse

const BookMarkList = ({ recipeList, recipeListLoading }: { recipeList: any, recipeListLoading: boolean }) => {
    console.log(recipeList)
    const { control, handleSubmit, isCreate, setIsCreate, onSubmit, clearErrors, isLoading } = useBookmarkList()
    return (
        <div className="mb-5">
            {isCreate ?
                <Form onFinish={handleSubmit(onSubmit)}>
                    <div className="flex gap-2">
                        <FormItem className="mb-0">
                            <InputText
                                placeholder="Tên danh sách"
                                className="w-full"
                                autoComplete='off'
                                name="name"
                                size='middle'
                                control={control}
                            />
                        </FormItem>
                        <div className="flex gap-[6px]">
                            <Button loading={isLoading} htmlType="submit" className="btn-filled">Thêm</Button>
                            <Button 
                                className="btn-outlined" 
                                onClick={() => {
                                    setIsCreate(false)
                                    clearErrors('name')
                                }}
                            >
                                Hủy
                            </Button>
                        </div>
                    </div>
                </Form>
                :
                <Button className="btn-filled" onClick={() => setIsCreate(true)}>Thêm danh sách mới</Button>
            }
            {recipeListLoading ? (
                <Skeleton active />
            ) : recipeList ?
                <div className="mt-4 grid gap-y-3">
                    {recipeList.map((item: Recipe_List.TRecipeListResponse) => (
                        <Collapse
                            size="small"
                            key={item.recipeListId}
                            expandIconPosition="end"
                            className="flex flex-col"
                            collapsible="icon"
                        >
                            <Panel
                                key={item.name}
                                header={
                                    <div className="flex flex-row justify-between">
                                        <p className="text-heading5">{item.name}</p>
                                        <div className="flex flex-row items-center gap-2">
                                            <p className="text-body-2-regular text-neutral-6">

                                            </p>

                                        </div>
                                    </div>
                                }
                            >
                                <DetailBookMark recipeListId={item.recipeListId} />
                            </Panel>
                        </Collapse>
                    ))}
                </div>
                :
                <Empty description={`Không có công thức`} />
            }
        </div>
    )
}

export default BookMarkList