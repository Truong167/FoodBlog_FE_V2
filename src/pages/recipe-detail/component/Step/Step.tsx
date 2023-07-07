import { Fragment } from "react"
import Section from "../../../../components/Section/Section"
import { imageUrl } from "../../../../utils/constant"


const Step: React.FC<Partial<Recipe.TRecipeDetailResponse>> = ({ Steps }) => {
    return (
        <Section>
            <Fragment>
                <h3>Hướng dẫn nấu nướng</h3>
                {Steps && Steps.map(item => {
                    return (
                        <div key={item.stepId} className='mb-4'>
                            <span><b>Bước {item.stepIndex}</b></span>
                            <p>{item.description}</p>
                            {item.image &&
                                <img src={`${imageUrl + item.image}`} alt={`${item.stepId}`} className="w-44 h-44 object-cover mt-1 rounded" />
                            }
                        </div>
                    )
                })}
            </Fragment>
        </Section>
    )
}

export default Step