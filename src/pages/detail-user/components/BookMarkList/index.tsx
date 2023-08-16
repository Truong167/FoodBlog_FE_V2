import { Collapse, Empty, Skeleton } from "antd"
import DetailBookMark from "../DetailBookMark"

const { Panel } = Collapse

const BookMarkList = ({ recipeList, recipeListLoading }: { recipeList: any, recipeListLoading: boolean }) => {
    console.log(recipeList)
    return (
        <div className="mb-5">
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
                                <DetailBookMark recipeListId={item.recipeListId}/>
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