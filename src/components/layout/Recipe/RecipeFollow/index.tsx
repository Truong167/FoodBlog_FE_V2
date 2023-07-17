import { Fragment } from "react"
import { useRecipeByFollow } from "../../../../services/Recipe/service"
import RecipeList from "../../../Recipe/RecipeList"
import Section from "../../../Section/Section"
import { Skeleton } from "antd"


const RecipeFollow = () => {
    const { isLoading, data: recipes } = useRecipeByFollow()
    return (
        <Section>
            {isLoading ? <Skeleton active /> :
                <Fragment>
                    <h4>Công thức mới từ người mà bạn theo dõi</h4>
                    <RecipeList recipes={recipes} />
                </Fragment>

            }
        </Section>
    )
}

export default RecipeFollow
