import { useQueryClient } from '@tanstack/react-query'
import { imageUrl } from '../../../contants/constant'
import classes from './IngredientItem.module.css'
import React from 'react'

interface Props {
    name: string 
    image: string
    isActive?: string
}

const IngredientItem: React.FC<Props> = ({name, image, isActive}) => {
  const queryClient = useQueryClient()
  const handleOnClick = () => {
    queryClient.setQueryData(['ingredientName'], name)
  }
  return (
    <div className={classes.container} style={isActive === name ? {backgroundColor: '#ffebd6'} : {}} onClick={handleOnClick}>
      <img src={image} alt={name} className={classes.image}/>
      <span className={classes.name}>{name}</span>
    </div>
  )
}

export default IngredientItem
