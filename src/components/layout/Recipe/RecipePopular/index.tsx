import { Skeleton } from "antd"
import { useRecipePopular } from "../../../../services/Recipe/service"
import RecipeList from "../../../Recipe/RecipeList"
import Section from "../../../Section/Section"
import { Fragment } from "react"


const RecipePopular = () => {
    const { isLoading, data: recipes } = useRecipePopular()
    return (
        <Section>
            {isLoading ?
                <Skeleton active />
                :
                <Fragment>
                    <h4>Công thức phổ biến trong tuần</h4>
                    <RecipeList recipes={recipes} />
                </Fragment>
            }
        </Section>
    )
}

export default RecipePopular
