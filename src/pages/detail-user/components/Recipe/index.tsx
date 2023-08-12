import { Empty, Skeleton } from "antd"
import Section from "../../../../components/Section/Section"
import RecipeCard from "../../../../components/Recipe/RecipeItem/RecipeCard"

const Recipe = ({ data, isLoading }: { data: Recipe.TRecipeResponse[], isLoading: boolean }) => {
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
                <Empty description={`Không có công thức`} />
            }
        </Section>
    )
}

export default Recipe