import { Skeleton } from "antd"
import { useRecipePopular } from "../../../../services/Recipe/service"
import { Fragment } from "react"
import Section from "../../../../components/Section/Section"
import RecipeList from "../../../../components/Recipe/RecipeList"


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
