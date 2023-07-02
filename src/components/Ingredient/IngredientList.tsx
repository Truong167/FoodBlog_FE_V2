import IngredientItem from './IngredientItem/IngredientItem'


const IngredientList = ({ingredient, isActive}: {ingredient: [{name: string, image: string, ingredientId: string}], isActive: any}) => {
    return (
        <div className='flex gap-2.5 flex-wrap mt-3'>
            {ingredient.map((item) => (
                <IngredientItem isActive={isActive} {...item} key={item.ingredientId}/>
            ))}
        </div>
    )
}

export default IngredientList