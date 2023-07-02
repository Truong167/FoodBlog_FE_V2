import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from './RecipeList.module.css'
import RecipeCard from './RecipeItem/RecipeCard';

const RecipeList = ({ recipes }: { recipes: any }) => {
  const [settings, setSettings] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2
  })
  return (
    <div className={classes.container}>
      {recipes && recipes.length > 0 ? (recipes.length > 4 ?
        <Slider {...settings}>
          {recipes.map((item: any) => (
            <RecipeCard {...item} key={item.recipeId} />
          ))}
        </Slider>
        :
        <div className={classes.content}>
          {recipes.map((item: any) => (
            <RecipeCard {...item} key={item.recipeId} />
          ))}
        </div>
      ) : <h3>Không có công thức phù hợp</h3>
      }
    </div>

  )
}

export default RecipeList
