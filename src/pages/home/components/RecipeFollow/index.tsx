import { Fragment } from "react"
import { useRecipeByFollow } from "../../../../services/Recipe/service"
import { Skeleton } from "antd"
import Section from "../../../../components/Section/Section"
import RecipeList from "../../../../components/Recipe/RecipeList"


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
