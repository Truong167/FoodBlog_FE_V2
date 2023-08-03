import { Empty, Skeleton } from "antd"
import Section from "../../../../components/Section/Section"
import { useGetRecipeByUserId } from "../../../../services/Recipe/service"
import { Fragment } from "react"
import RecipeCard from "../../../../components/Recipe/RecipeItem/RecipeCard"

const Recipe = ({ data, isLoading }: { data: Recipe.TRecipeResponse[], isLoading: boolean }) => {
    // const { data, isLoading } = useGetRecipeByUserId(userId)
    console.log(data)
    return (
        <Section>
            {isLoading ? (
                <Skeleton active />
            ) : data ?
                <div className="grid grid-cols-4 gap-y-4 gap-x-1 mt-4">
                    {data.map((item: any) => (
                        <RecipeCard {...item} key={item.recipeId} />
                    ))}
                </div>
                :
                <Empty description={`Không có kết quả với từ khóa`} />
            }
        </Section>
    )
}

export default Recipe